/**
 * Own
 */
import { QuestionBase } from "./question-base";
import { IQuestionControlOptions } from ".";

export class HiddenQuestion<T> extends QuestionBase<T> {
    public controlType ? = "hidden";

    constructor(options: IQuestionControlOptions<T>) {
        super(options);
    }
}
