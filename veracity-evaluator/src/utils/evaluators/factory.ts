import { Aspect, DataType, Objective } from "../../models/Evaluation.model";
import { Evaluator } from "./evaluator";
import { jsonEvaluatorFactory } from "./Json/factory";

export interface EvaluatorFactory {
    createEvaluator(
        aspect: Aspect,
        evaluation: any
    ): Evaluator | undefined;
}

const factories: Record<DataType, EvaluatorFactory> = {
    JSON: jsonEvaluatorFactory,
    TABULAR: undefined as any,
};

export const createEvaluator = (
    dataType: DataType,
    objective: Objective,
): Evaluator | undefined => {
    const factory = factories[dataType];
    if (factory) {
        return factory.createEvaluator(objective.aspect, objective.evaluation);
    }
    return undefined;
}