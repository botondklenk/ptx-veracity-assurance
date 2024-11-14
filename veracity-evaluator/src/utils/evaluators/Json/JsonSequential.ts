import { Evaluator } from '../evaluator';
import { AspectResult } from '../../../models/Evaluation.model';
import { getNestedValue } from './helpers';

export class JsonSequentialEvaluator extends Evaluator {
    protected evaluateData(
        resourceId: string,
        data: any,
        newResultValue: Record<string, any>
    ): void {
        newResultValue.valid = true;
        newResultValue.resourceId = resourceId;

        for (let i = 1; i < data.length; i++) {
            const prevValue = getNestedValue(data[i - 1], this.config.target);
            const currValue = getNestedValue(data[i], this.config.target);

            if ((this.config.type === "ascending" && prevValue > currValue) ||
                (this.config.type === "descending" && prevValue < currValue)) {
                newResultValue.valid = false;
                break;
            }
        }
    }

    protected updateResult(
        newResultValue: { resourceId: string; valid: boolean },
        sequentialResult: AspectResult
    ): void {
        if (!sequentialResult.value) {
            sequentialResult.value = [];
        }

        sequentialResult.value.push(newResultValue);
        if (sequentialResult.valid === null || sequentialResult.valid) {
            sequentialResult.valid = newResultValue.valid;
        }
    }
}
