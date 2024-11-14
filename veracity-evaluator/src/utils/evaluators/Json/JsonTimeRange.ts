import { Evaluator } from '../evaluator';
import { AspectResult } from '../../../models/Evaluation.model';
import { getNestedValue } from './helpers';

export class JsonTimeRangeEvaluator extends Evaluator {
    protected evaluateData(
        resourceId: string, 
        data: any, 
        newResultValue: any
    ): void {
        newResultValue.valid = true;
        newResultValue.resourceId = resourceId;

        const { measurement, unit } = this.config;

        const rangeMs = this.getMilliseconds(measurement, unit);

        let oldestTimestamp: number | undefined;
        let newestTimestamp: number | undefined;

        for (const item of data) {
            const timestamp = new Date(getNestedValue(item, this.config.target)).getTime();
            if (!oldestTimestamp || timestamp < oldestTimestamp) oldestTimestamp = timestamp;
            if (!newestTimestamp || timestamp > newestTimestamp) newestTimestamp = timestamp;

            if (newestTimestamp && oldestTimestamp && (newestTimestamp - oldestTimestamp) > rangeMs) {
                newResultValue.valid = false;
                break;
            }
        }
    }

    protected updateResult(
        newResultValue: { resourceId: string; valid: boolean },
        timeRangeResult: AspectResult
    ): void {
        if (!timeRangeResult.value) {
            timeRangeResult.value = [];
        }

        timeRangeResult.value.push(newResultValue);
        if (timeRangeResult.valid === null || timeRangeResult.valid) {
            timeRangeResult.valid = newResultValue.valid;
        }
    }

    private getMilliseconds(measurement: number, unit: string): number {
        const units: { [key: string]: number } = {
            second: 1000,
            minute: 1000 * 60,
            hour: 1000 * 60 * 60,
            day: 1000 * 60 * 60 * 24,
            week: 1000 * 60 * 60 * 24 * 7,
        };
        return measurement * (units[unit.toLowerCase()] || 0);
    }
}
