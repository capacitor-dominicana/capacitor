/**
 * Own
 */
import { QuestionBase } from "./question-base";
import { IQuestionControlOptions } from ".";

export class SingleQuestion<T> extends QuestionBase<T> {
    public controlType ? = "single";
    // Tiene el metadata de la entidad relacionada
    public properties: any;
    // Es el controlador en el cual se guardara la entidad si esta permite guardado previo
    public saveOptionController?: string;

    constructor(options: IQuestionControlOptions<T>, properties: any, saveOptionController: string) {
        super(options);
        this.properties = properties;
        this.saveOptionController = saveOptionController;
    }
}
