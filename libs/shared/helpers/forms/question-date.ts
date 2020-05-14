/**
 * Own
 */
import { QuestionBase } from "./question-base";
import { IQuestionControlOptions } from "./question-options.model";

export interface DateBetweenDependency {
    startDateFormControlKey: string;
    endDateFormControlKey: string;
    dependentFieldsAreInParentForm?: boolean;
}

export class DateQuestion<T> extends QuestionBase<T> {
    public controlType ? = "date";
    public startDate?: Date;
    public startView?: string;
    public lessThan?: string;
    public dateBetween?: DateBetweenDependency;

    constructor(
        options: IQuestionControlOptions<T>,
        startDate: Date = new Date(1990, 0, 1),
        startView: string = "multi-year",
        lessThan: string,
        dateBetween: DateBetweenDependency) {
        super(options);
        this.startDate = startDate;
        this.startView = startView;
        this.lessThan = lessThan;
        this.dateBetween = dateBetween;
    }
}
