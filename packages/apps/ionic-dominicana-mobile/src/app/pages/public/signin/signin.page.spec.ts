import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

/**
 * Own
 */
// pages
import { SigninPage } from "./signin.page";

describe("SigninPage", () => {
    let component: SigninPage;
    let fixture: ComponentFixture<SigninPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SigninPage],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(SigninPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
