import { Model } from '../utils/requests';
import { Evaluation, EvaluationModel, EvaluationStatus, EvaluationResult, VLA } from '../models/Evaluation.model';
import { createEvaluator } from '../utils/evaluators/factory';
import { Types } from 'mongoose';
import { NotFoundError } from '../utils/errors';

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

        evaluation.status = status;

        await evaluation.save();
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
}

export const evaluationService = new EvaluationService();