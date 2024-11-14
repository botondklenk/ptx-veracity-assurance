import { AspectResult } from '../../../models/Evaluation.model';
import { Evaluator } from '../evaluator';

export class JsonAmountEvaluator extends Evaluator {
    protected evaluateData(
        resourceId: string,
        data: any,
        newResultValue: Record<string, any>
    ): void {
        newResultValue.amount = data.length;
    }

    protected updateResult(
        newResultValue: { amount: number },
        amountResult: AspectResult
    ): void {
        if (!amountResult.value) {
            amountResult.value = { amount: 0 };
        }

        amountResult.value.amount += newResultValue.amount;
        amountResult.valid =
            amountResult.value.amount >= this.config.min &&
            amountResult.value.amount <= this.config.max;
    }
}