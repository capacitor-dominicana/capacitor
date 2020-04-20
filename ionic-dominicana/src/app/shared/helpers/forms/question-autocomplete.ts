/**
 * Own
 */
import { QuestionBase } from "./question-base";
import { IQuestionControlOptions } from "./question-options.model";
import { Observable } from "rxjs";
import { AutocompleteOption } from "@app/shared/models/autocomplete-option/autocomplete-option.model";

export class AutocompleteQuestion<T, K> extends QuestionBase<T> {
    public controlType ? = "autocomplete";
    // Son las propiedades de la entidad que se utilizaran para filtrar
    public propertiesToFilterBy: string[];
    // Es el recurso observable del cual se obtendran las opciones del autocomplete
    public source?: Observable<T[]>;
    // Si es un autocomplete de una sola opcion es la entidad que se pondra en el autocomplete durante la edicion
    public entity?: K;
    // Si es un autocomplete con seleccion multiple son las entidades seleccionadas anteriormente para poder llenar las opciones durante la edicion
    public entities?: Array<K>;
    // Si es un autocomplete de una entidad relacionada multiple son las entidades seleccionadas en cada uno de los autocomplete, asumiento que son de una sola seleccion
    public entitiesList?: Array<K>;
    // Son strings representando cual propiedad de la entidad buscar para cada propiedad del autocomplete option
    public propertyNamesForAutocompleteOptions: AutocompleteOption;
    // Indica si es un autocomplete de multiples opciones o de una sola
    public isMultiselect: boolean;

    constructor(
        options: IQuestionControlOptions<T>,
        propertiesToFilterBy: string[],
        source: Observable<T[]>,
        entity: K,
        entities: Array<K>,
        entitiesList: Array<K>,
        propertyNamesForAutocompleteOptions: AutocompleteOption,
        isMultiselect: boolean = false) {
        super(options);
        this.propertiesToFilterBy = propertiesToFilterBy;
        this.source = source;
        this.entity = entity;
        this.entities = entities;
        this.entitiesList = entitiesList;
        this.propertyNamesForAutocompleteOptions = propertyNamesForAutocompleteOptions;
        this.isMultiselect = isMultiselect;
    }
}