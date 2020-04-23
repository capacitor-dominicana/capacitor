import { TestBed, async, inject } from "@angular/core/testing";

import { NoopGuard } from "./noop.guard";

describe("NoopGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoopGuard]
    });
  });

  it("should ...", inject([NoopGuard], (guard: NoopGuard) => {
    expect(guard).toBeTruthy();
  }));
});
