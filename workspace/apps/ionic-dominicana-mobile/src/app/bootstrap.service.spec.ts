import { fakeAsync, getTestBed, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";

/**
 * Own
 */
// services
import { BootstrapService } from "./bootstrap.service";

describe("*** Application Init Settings ***", () => {
    let httpMock: HttpTestingController;
    let appSetup: BootstrapService;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                HttpClient,
                Location,
                BootstrapService
            ]
        });

        const testbed = getTestBed();
        appSetup = testbed.inject(BootstrapService);
        httpMock = testbed.inject(HttpTestingController);
    }));

    it("should return the AppSettings resource...", () => {
        const appSettingsResource: Promise<any> = appSetup.getAppSettingsResource();
        const req = httpMock.expectOne("/api/settings");
        expect(req.request.method).toEqual("GET");
        httpMock.verify();
    });
});
