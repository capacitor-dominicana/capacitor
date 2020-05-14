/**
 * Own
 */
import { QuestionBase } from "./question-base";
import { IQuestionControlOptions } from ".";

export class TextboxQuestion<T> extends QuestionBase<T> {
    public controlType ? = "textbox";
    public autocompleteLocalOpts?: Array<string>;

    constructor(options: IQuestionControlOptions<T>, autocompleteLocalOpts?: Array<string>) {
        super(options);
        this.autocompleteLocalOpts = autocompleteLocalOpts;
    }
}
