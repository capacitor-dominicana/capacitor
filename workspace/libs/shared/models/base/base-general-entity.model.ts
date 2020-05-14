/**
 * OWn
 */
// models
import { Base } from "./base.model";
import { PropertyType } from "../property-type.enum";
import { PropertyMetadata } from "libs/shared/decorators/property-metadata";
import { HiddenQuestion } from "libs/shared/helpers/forms/question-hidden";
import { TextboxQuestion } from "libs/shared/helpers/forms/question-textbox";
import { CheckboxQuestion } from "libs/shared/helpers/forms/question-checkbox";

export class BaseGeneralEntity extends Base {
    @PropertyMetadata<HiddenQuestion<any>>({
        propertyType: PropertyType.HIDDEN,
        key: "id",
        value: null,
        notMapped: true
    })
    public id: any;

    @PropertyMetadata<TextboxQuestion<string>>({
        propertyType: PropertyType.INPUT,
        key: "name",
        label: "Nombre",
        placeholder: "Ingrese nombre",
        required: true
    })
    public name: string;

    @PropertyMetadata<CheckboxQuestion<boolean>>({
        propertyType: PropertyType.CHECKBOX,
        key: "enabled",
        label: "Activo",
        value: true
    })
    public enabled: boolean;

    @PropertyMetadata<HiddenQuestion<boolean>>({
        propertyType: PropertyType.HIDDEN,
        key: "deleted",
        value: false,
        notMapped: true
    })
    public deleted: boolean;
}
