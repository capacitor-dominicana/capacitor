import { Injectable } from "@angular/core";

/**
 * Own
 */
// models
import { IDocumentGenerationService } from "./document-generation.service.model";
import { Identifier } from "@capacitor/shared/decorators";
import { ExportModes, DocumentType } from "./models";
import { DOCUMENT_GENERATION_SERVICE_TOKEN } from "../../tokens";

@Injectable({
  providedIn: "root"
})
@Identifier({
    token: DOCUMENT_GENERATION_SERVICE_TOKEN
})
export class DocumentGenerationService implements IDocumentGenerationService {

    constructor() {
        // to do
    }

    public prepareDocument(documentType: DocumentType): void {
        switch (documentType) {
            case DocumentType.PDF:
                break;
            default:
                break;
        }
    }

    public openDocument(mode: ExportModes): void {

    }

    public downloadDocument(): void {

    }
}
