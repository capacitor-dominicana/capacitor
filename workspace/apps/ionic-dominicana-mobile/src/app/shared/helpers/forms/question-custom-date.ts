/**
 * Own
 */
import { QuestionBase } from "./question-base";
import { IQuestionControlOptions } from "./question-options.model";

export class CustomDateQuestion<T> extends QuestionBase<T> {
    public controlType ? = "customDate";
    public startDate?: string;

    constructor(options: IQuestionControlOptions<T>, startDate: string = "") {
        super(options);
        this.startDate = startDate;
    }
}
