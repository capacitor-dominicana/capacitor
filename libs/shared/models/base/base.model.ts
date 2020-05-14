/**
 * Own
 */
import { BasePropertyMetadata } from "@capacitor/shared/decorators";
import { SetupQuestion } from "@capacitor/shared/helpers";
import { IDisplayPropertyMetadata } from "..";

export interface IBase {
    id?: any;
    createdBy?: string;
    updatedBy?: string;
    deleted?: boolean;
}

export class Base implements IBase {
    @BasePropertyMetadata<IDisplayPropertyMetadata>({
        key: "id",
        label: "ID",
        notMapped: true
    })
    public id?: any;

    @BasePropertyMetadata<IDisplayPropertyMetadata>({
        key: "createdDate",
        label: "Fecha de creación",
        notMapped: true
    })
    public createdDate?: Date;

    @BasePropertyMetadata<IDisplayPropertyMetadata>({
        key: "updatedDate",
        label: "Fecha de modificación",
        notMapped: true
    })
    public updatedDate?: Date;

    @BasePropertyMetadata<IDisplayPropertyMetadata>({
        key: "createdBy",
        label: "Creado Por",
        notMapped: true
    })
    public createdBy?: string;

    @BasePropertyMetadata<IDisplayPropertyMetadata>({
        key: "updatedBy",
        label: "Actualizado Por",
        notMapped: true
    })
    public updatedBy?: string;

    @BasePropertyMetadata<IDisplayPropertyMetadata>({
        key: "deleted",
        label: "Eliminado?",
        notMapped: true
    })
    public deleted?: boolean;

    /**
     * Specifies a list of properties to be exclude from reactive form rendering on index based (e.g.: id = 0).
     * The 'exclue' property only affects the files included via the 'include' property and no the 'properties' property.
     * Glob patterns not implemented yet
     */
    @BasePropertyMetadata<SetupQuestion<string[]>>({
        notMapped: true
    })
    public includeProperties?: string[];

    /**
     * Specifies a list of properties that match properties to be included in reactive form rendering on index based (e.g.: id = 0).
     * If no 'properties' or 'include' property is present in a class instance, the rendering tool defaults to including all properties
     * in the containing class and subclasses except those specified by 'exclude'
     * Glob patterns not implemented yet
     */
    @BasePropertyMetadata<SetupQuestion<string[]>>({
        notMapped: true
    })
    public excludeProperties?: string[];
}
