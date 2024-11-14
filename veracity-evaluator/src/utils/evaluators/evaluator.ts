import { EvaluationResult, AspectResult } from "../../models/Evaluation.model";

export abstract class Evaluator {
    protected config: any;

    constructor(evaluation: any) {
        this.config = evaluation;
    }

    evaluate(resourceId: string, data: any, aspectResult: AspectResult): void {
        let newResultValue: Record<string, any> = {};
        this.evaluateData(resourceId, data, newResultValue);
        this.updateResult(newResultValue, aspectResult);
    }

    protected abstract evaluateData(
        resourceId: string, 
        data: any, 
        newResultValue: Record<string, any>
    ): void;

    protected abstract updateResult(
        newResultValue: Record<string, any>, 
        aspectResult: AspectResult
    ): void;
}