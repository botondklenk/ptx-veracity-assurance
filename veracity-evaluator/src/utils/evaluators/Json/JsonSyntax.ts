import { Evaluator } from '../evaluator';
import { AspectResult } from '../../../models/Evaluation.model';
import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

export class JsonSyntaxEvaluator extends Evaluator {
    private ajv: Ajv;

    constructor(evaluation: any) {
        super(evaluation);
        this.ajv = new Ajv();
        addFormats(this.ajv);
    }

    protected evaluateData(
        resourceId: string, 
        data: any, 
        newResultValue: any
    ): void {
        const validate = this.ajv.compile(this.config.schema);

        let validCount = 0;
        let invalidCount = 0;
        let errors: any[] = [];
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (validate(item)) {
                validCount++;
            } else {
                invalidCount++;
                errors.push(validate.errors?.map(error => (
                    {
                        resourceId: resourceId,
                        itemIndex: i,
                        message: error.message,
                    }
                )));
            }
        }

        newResultValue.validCount = validCount;
        newResultValue.invalidCount = invalidCount;
        newResultValue.errors = errors;
    }

    protected updateResult(
        newResultValue: { validCount: number; invalidCount: number; errors: any[] },
        syntaxResult: AspectResult
    ): void {
        if (!syntaxResult.value) {
            syntaxResult.value = {
                validCount: 0,
                invalidCount: 0,
                errors: []
            };
        }

        syntaxResult.value.validCount += newResultValue.validCount;
        syntaxResult.value.invalidCount += newResultValue.invalidCount;
        syntaxResult.value.errors = syntaxResult.value.errors.concat(newResultValue.errors);

        syntaxResult.valid = syntaxResult.value.invalidCount === 0;
    }
}