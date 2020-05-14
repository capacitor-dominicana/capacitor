/**
 * Own
 */
import { QuestionBase } from "./question-base";
import { IQuestionControlOptions } from ".";

export class MultipleQuestion<T> extends QuestionBase<T> {
    public controlType ? = "multiple";
    // Tiene el metadata de la entidad multiple relacionada
    public properties: any;

    constructor(options: IQuestionControlOptions<T>, properties?: any) {
        super(options);
        this.properties = properties;
    }
}
