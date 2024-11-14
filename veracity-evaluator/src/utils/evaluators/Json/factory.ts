import { Aspect } from "../../../models/Evaluation.model";
import { Model } from "../../../utils/requests";
import { Evaluator } from "../evaluator";
import { JsonAmountEvaluator } from "./JsonAmount";
import { JsonSequentialEvaluator } from "./JsonSequential";
import { JsonTimeRangeEvaluator } from "./JsonTimeRange";
import { JsonSyntaxEvaluator } from "./JsonSyntax";
import { EvaluatorFactory } from "../factory";

class JsonEvaluatorFactory implements EvaluatorFactory {
    private evaluators: Record<Aspect, new (evaluation: any) => Evaluator> = {
        syntax: JsonSyntaxEvaluator,
        time_range: JsonTimeRangeEvaluator,
        sequential: JsonSequentialEvaluator,
        amount: JsonAmountEvaluator
    };

    createEvaluator(
        aspect: Aspect, 
        evaluation: any
    ): Evaluator | undefined {
        const EvaluatorClass = this.evaluators[aspect];
        if (EvaluatorClass) {
            const evaluator = new EvaluatorClass(evaluation);
            return evaluator;
        }
        return undefined;
    }
}

export const jsonEvaluatorFactory = new JsonEvaluatorFactory();