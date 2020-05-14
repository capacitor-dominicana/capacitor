/**
 * Own
 */
import { QuestionBase } from "./question-base";
import { IQuestionControlOptions } from ".";

export class SetupQuestion<T> extends QuestionBase<T> {
    public controlType ? = "noQuestion";
    public properties?: any[] = []

    constructor(options: IQuestionControlOptions<T>) {
        super(options);
    }
}
