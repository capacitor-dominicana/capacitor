/**
 * Own
 */
import { QuestionBase } from "./question-base";
import { IQuestionControlOptions } from ".";

export class TextAreaQuestion<T> extends QuestionBase<T> {
    public controlType ? = "textarea";
    public hint?: string;

    constructor(options: IQuestionControlOptions<T>, hint?: string) {
        super(options);
        this.hint = hint;
    }
}
