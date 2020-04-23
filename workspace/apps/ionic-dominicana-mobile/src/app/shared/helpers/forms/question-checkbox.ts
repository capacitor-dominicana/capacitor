/**
 * Own
 */
import { QuestionBase } from "./question-base";
import { IQuestionControlOptions } from "./question-options.model";

export class CheckboxQuestion<T> extends QuestionBase<T> {
    public controlType ? = "checkbox";
    public isUnique?: boolean;
    public atLeastOneMustBeChecked?: boolean;

    constructor(options: IQuestionControlOptions<T>, isUnique: boolean = false, atLeastOneMustBeChecked: boolean = false) {
        super(options);
        this.isUnique = isUnique;
        this.atLeastOneMustBeChecked = atLeastOneMustBeChecked;
    }
}
