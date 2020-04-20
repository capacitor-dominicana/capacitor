import { TestBed } from "@angular/core/testing";

import { LifecycleFactory } from "./lifecycle.service";

describe("LifecycleFactory", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: LifecycleFactory = TestBed.get(LifecycleFactory);
    expect(service).toBeTruthy();
  });
});
