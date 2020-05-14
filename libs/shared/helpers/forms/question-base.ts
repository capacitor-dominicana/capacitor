/**
 * Own
 */
import { KeyValuePair, PropertyType } from "@capacitor/shared/models";
import { IQuestionControlOptions } from "@capacitor/shared/helpers";

export class QuestionBase<T> implements IQuestionControlOptions<T> {
    public propertyType?: PropertyType;
    public key?: string;
    public value?: T;
    public label?: string;
    public placeholder?: string;
    public required?: boolean;
    public controlType?: string;
    public disabled?: boolean;
    public dependentFields?: KeyValuePair<string, any>[];
    public minCharacterLength?: number;
    public maxCharacterLength?: number;
    public allowDecimals?: boolean;
    public notMapped?: boolean;
    public displayInForm?: boolean;
    public displayInFilter?: boolean;
    public dependentDropdown?: KeyValuePair<string, (id: any) => Promise<KeyValuePair<number, string>[]>>;

    constructor(questionOptions: IQuestionControlOptions<T> = {} as IQuestionControlOptions<T>) {
        if (questionOptions) {
            this.propertyType = questionOptions.propertyType;
            this.key = questionOptions.key || "";
            this.value = questionOptions.value;
            this.label = questionOptions.label || "";
            this.placeholder = questionOptions.placeholder || "";
            this.required = !!questionOptions.required;
            this.controlType = questionOptions.controlType || "";
            this.disabled = questionOptions.disabled || false;
            this.dependentFields = questionOptions.dependentFields;
            this.minCharacterLength = questionOptions.minCharacterLength;
            this.maxCharacterLength = questionOptions.maxCharacterLength;
            this.allowDecimals = !!questionOptions.allowDecimals;
            this.notMapped = questionOptions.notMapped;
            this.displayInForm = !!questionOptions.displayInForm;
            this.displayInFilter = !!questionOptions.displayInFilter || false;
            this.dependentDropdown = questionOptions.dependentDropdown;
        }
    }
}
