import { TestBed } from '@angular/core/testing';

import { DocumentGenerationService } from './document-generation.service';

describe('DocumentGenerationService', () => {
  let service: DocumentGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
