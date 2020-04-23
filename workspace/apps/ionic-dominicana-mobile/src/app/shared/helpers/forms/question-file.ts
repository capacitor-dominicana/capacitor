/**
 * Own
 */
import { QuestionBase } from "./question-base";
import { IQuestionControlOptions } from "./question-options.model";

export class FileQuestion<T> extends QuestionBase<T> {
    public controlType ? = "file";
    public fileType: number;
    public multipleFiles: boolean;
    public fileSource?: string;
    public fileContainerId?: string;

    constructor(options: IQuestionControlOptions<T>
        , fileType: number
        , multipleFiles: boolean
        , fileSource: string
        , fileContainerId: string
    ) {
        super(options);
        this.fileType = fileType;
        this.multipleFiles = multipleFiles;
        this.fileSource = fileSource;
        this.fileContainerId = fileContainerId;
    }
}
