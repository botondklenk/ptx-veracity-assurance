import { Model } from '../utils/requests';
import { Evaluation, EvaluationModel, EvaluationStatus, EvaluationResult, VLA } from '../models/Evaluation.model';
import { createEvaluator } from '../utils/evaluators/factory';
import { Types } from 'mongoose';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { ProofService as client } from '../generated/handler-client';
import crypto from 'crypto';
import { handleHandlerCall } from '../utils/handler-client';
import { CONFIG } from '../config/environment';

class EvaluationService {
    async listEvaluations(): Promise<Model<'Evaluation'>[]> {
        const evaluations = await EvaluationModel.find();
        return evaluations.map(this.mapEvaluation);
    }

    async getEvaluation(exchangeId: string): Promise<Model<'Evaluation'>> {
        const document = await EvaluationModel.findById(exchangeId);
        if (!document) throw new NotFoundError(`Evaluation with id ${exchangeId} not found`);

        return this.mapEvaluation(document);
    }

    async startEvaluation(
        exchangeId: string,
        vla: Model<'VLA'>
    ): Promise<Model<'Evaluation'>> {
        const evaluation: Evaluation = {
            _id: new Types.ObjectId(exchangeId),
            status: 'STARTED',
            vla,
            result: vla.objectives.reduce((result, objective) => {
                result.push(
                    {
                        aspect: objective.aspect,
                        result: {
                            value: null,
                            valid: null,
                        },
                    }
                );
                return result;
            }, [] as EvaluationResult)
        }
        const document = new EvaluationModel(evaluation);

        await document.save();
        return this.mapEvaluation(document);
    }

    async evaluateData(
        exchangeId: string,
        resourceId: string,
        data: any[]
    ): Promise<void> {
        const document = await EvaluationModel.findById(exchangeId);
        if (!document) throw new NotFoundError(`Evaluation with id ${exchangeId} not found`);

        const dataType = document.vla.meta.dataType;

        document.vla.objectives.forEach((objective, index) => {
            const evaluator = createEvaluator(dataType, objective);
            if (evaluator) {
                evaluator.evaluate(
                    resourceId, 
                    data, 
                    document.result[index].result
                );
            }
        });

        document.markModified('result');
        await document.save();
    }

    async updateStatus(
        exchangeId: string,
        status: EvaluationStatus
    ): Promise<void> {
        const evaluation = await EvaluationModel.findById(exchangeId);
        if (!evaluation) throw new NotFoundError(`Evaluation with id ${exchangeId} not found`);
        if (evaluation.status !== 'STARTED') {
            throw new BadRequestError('Ended evaluation cannot be restarted');
        }
        evaluation.status = status;
        await evaluation.save();

        if (status === 'FINISHED') {
            // this is not awaited, so it will not block the exchange
            handleHandlerCall(() => client.uploadResultHash(
                exchangeId, 
                CONFIG.participant, 
                { 
                    resultHash: this.createHash(evaluation.result)
                }
            ));
        }
    }

    private mapEvaluation(evaluation: Evaluation): Model<'Evaluation'> {
        return {
            exchangeId: evaluation._id.toString(),
            status: evaluation.status,
            vla: {
                meta: evaluation.vla.meta,
                objectives: evaluation.vla.objectives.map(objective => ({
                    description: objective.description,
                    aspect: objective.aspect,
                    evaluation: objective.evaluation as Record<string, never>,
                })),
            },
            result: evaluation.result.map(result => ({
                aspect: result.aspect,
                result: {
                    value: result.result.value as Record<string, never>,
                    valid: result.result.valid,
                },
            })),
        };
    }

    private createHash(data: any): string {
        return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
    }
}

export const evaluationService = new EvaluationService();