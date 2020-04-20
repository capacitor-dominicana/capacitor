/**
 * Own
 */
import { PropertyType } from "@app/shared";
import { KeyValuePair } from "@app/shared/models/key-value-pair/key-value-pair.model";

export interface IQuestionControlOptions<T> {
    /** The property input type */
    propertyType?: PropertyType;

    /** The key in the element */
    key?: string;

    /** The value in the DOM */
    value?: T;

    /** The display label of the model property */
    label?: string;

    /** The placeholder in the control */
    placeholder?: string;

    /** Indicates whether the control is required or not  */
    required?: boolean;

    /** Identifies the type of element to render in the view */
    controlType?: string;

    /** Indicates whether the item or control will be disabled or not */
    disabled?: boolean;

    /** Determines which field and its value depends on to show/hide */
    dependentFields?: KeyValuePair<string, any>[];

    /** Indicates the required minimum length of the characters in the control */
    minCharacterLength?: number;

    /** Indicates the required maximum length of the characters in the control */
    maxCharacterLength?: number;

    /** Indicates if the control allows decimal numbers */
    allowDecimals?: boolean;

    /** Indicates the field will not appear in the table */
    notMapped?: boolean;

    /** Indicates whether the field will be displayed in the form */
    displayInForm?: boolean;

    /** Indicates whether the field will be displayed in the filtered views */
    displayInFilter?: boolean;

    /** Contains the key of the dependent dropdown and the function that returns a promise with the options of the dependent dropdown */
    dependentDropdown?: KeyValuePair<string, (id: any) => Promise<KeyValuePair<number, string>[]>>;
}
