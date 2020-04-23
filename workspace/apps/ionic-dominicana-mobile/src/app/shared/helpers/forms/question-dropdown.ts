import { QuestionBase } from "./question-base";
import { IQuestionControlOptions } from "./question-options.model";
import { KeyValuePair } from "@app/shared/models/key-value-pair/key-value-pair.model";
import { Observable } from "rxjs";

export class DropdownQuestion<T> extends QuestionBase<T> {
    public controlType ? = "dropdown";
    // Son las opciones que tendra el dropdown
    public values: KeyValuePair<number, string>[];
    // Es el recurso observable del cual se obtendran las opciones del dropdown
    public source?: Observable<T[]>;

    constructor(
        options: IQuestionControlOptions<T>,
        values: KeyValuePair<number, string>[],
        source: Observable<T[]>) {
        super(options);
        this.values = values;
        this.source = source;
    }
}
