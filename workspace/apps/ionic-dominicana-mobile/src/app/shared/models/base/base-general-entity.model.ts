import { Base } from "@app/shared/models/base";
import { PropertyMetadata } from "@app/shared/decorators";
import { TextboxQuestion, CheckboxQuestion, HiddenQuestion } from "@app/shared";
import { PropertyType } from "../property-type.enum";

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
