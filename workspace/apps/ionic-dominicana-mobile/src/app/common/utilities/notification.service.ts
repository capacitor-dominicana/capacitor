import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SweetAlertOptions } from "sweetalert2";
import * as Swal from "sweetalert2";
import * as _ from "lodash";

/**
 * Own
 */
// models
import { UTIL_SERVICE_TOKEN } from "../tokens";
import { INotificationHandlers } from "./notification-handlers.model";
import { INotificationService } from "./notification.service.model";
import { Progress, Identifier, ITuple } from "../../shared";

@Injectable({
    providedIn: "root"
})
@Identifier({
    token: UTIL_SERVICE_TOKEN
})
export class NotificationService implements INotificationService {
    public alertCustomOptions: SweetAlertOptions;

    constructor(private translateService: TranslateService) {
        this.onInit();
    }

    public onInit() {
        this.applyCustomOrDefaultAlertOptions();
    }

    public success(message: string, title?: string, closeTitle?: string, handlers?: INotificationHandlers): Promise<Swal.SweetAlertResult> {
        this.alertCustomOptions = _.clone(this.applyCustomOrDefaultAlertOptions());
        this.alertCustomOptions.icon = "success";
        this.alertCustomOptions.timer = 3000;
        return this.updateAlertWithCustomOptions(message, title, closeTitle, handlers);
    }

    public error(message: string, title?: string, closeTitle?: string, handlers?: INotificationHandlers): Promise<Swal.SweetAlertResult> {
        this.alertCustomOptions = _.clone(this.applyCustomOrDefaultAlertOptions());
        this.alertCustomOptions.icon = "error";
        return this.updateAlertWithCustomOptions(message, title, closeTitle, handlers);
    }

    public warning(message: string, title?: string, closeTitle?: string, handlers?: INotificationHandlers): Promise<Swal.SweetAlertResult> {
        this.alertCustomOptions = _.clone(this.applyCustomOrDefaultAlertOptions());
        this.alertCustomOptions.icon = "warning";
        return this.updateAlertWithCustomOptions(message, title, closeTitle, handlers);
    }

    public info(message: string, title?: string, closeTitle?: string, handlers?: INotificationHandlers): Promise<Swal.SweetAlertResult> {
        this.alertCustomOptions = _.clone(this.applyCustomOrDefaultAlertOptions());
        this.alertCustomOptions.icon = "info";
        return this.updateAlertWithCustomOptions(message, title, closeTitle, handlers);
    }

    public confirm(message: string|ITuple<string>
                ,  title?: string
                ,  confirmText?: string
                ,  cancelText?: string
                ,  closeTitle?: string
                ,  handlers?: INotificationHandlers
        ): Promise<Swal.SweetAlertResult> {
        const currentMessage = ((message as ITuple<string>).value)
            ? this.translateService.instant("SYSTEM.COMMON.MESSAGES.QUESTIONS.REMOVE_SELECTED_RECORD", { ELEMENT_NAME: (message as ITuple<string>).value })
            : message;
        confirmText = confirmText || this.translateService.instant("SYSTEM.COMMON.MESSAGES.ACTIONS.YES");
        this.alertCustomOptions = _.clone(this.applyCustomOrDefaultAlertOptions());
        this.alertCustomOptions.title = "Confirmación";
        this.alertCustomOptions.icon = "question";
        this.alertCustomOptions.confirmButtonText = confirmText;
        this.alertCustomOptions.cancelButtonText = (cancelText) ? cancelText : "Cancelar";
        this.alertCustomOptions.showConfirmButton = true;
        this.alertCustomOptions.showCancelButton = true;
        this.alertCustomOptions.reverseButtons = true;
        return this.updateAlertWithCustomOptions(currentMessage, title, closeTitle, handlers);
    }

    public custom(html: string) {
        this.toggleSnackBar(Progress.Start, html);
    }

    public toggleProgressBar(status: Progress): void {
        // custom progress bar, implement here!
    }

    public toggleSnackBar(status: Progress, message: string, action?: string): void {
        // snack bar notification, implement here!
    }

    public async subscribeAlertEvents(alertHandlers: INotificationHandlers): Promise<Swal.SweetAlertResult> {
        if (alertHandlers) {
            if (alertHandlers.render) {
                this.alertCustomOptions.onRender = alertHandlers.render;
            }
            if (alertHandlers.open) {
                this.alertCustomOptions.onOpen = alertHandlers.open;
            }
            if (alertHandlers.beforeOpen) {
                this.alertCustomOptions.onBeforeOpen = alertHandlers.beforeOpen;
            }
            if (alertHandlers.close) {
                this.alertCustomOptions.onClose = alertHandlers.close;
            }
            if (alertHandlers.afterClose) {
                this.alertCustomOptions.onAfterClose = alertHandlers.afterClose;
            }
        }
        const sweetAlertResult: Swal.SweetAlertResult = await Swal.default.fire(this.alertCustomOptions);
        return sweetAlertResult;
    }

    public applyCustomOrDefaultAlertOptions(newOptions?: SweetAlertOptions): SweetAlertOptions {
        this.alertCustomOptions = newOptions || {
            title: "Información del sistema",
            text: "Un error no conocido se ha encontrado. Favor, comunicarse con su administrador de sistemas",
            icon: "error",
            showCloseButton: true,
            closeButtonHtml: null
        };
        return this.alertCustomOptions;
    }

    private updateAlertWithCustomOptions(text: string, title: string, closeButtonHtml: string, handlers: INotificationHandlers): Promise<Swal.SweetAlertResult> {
        this.alertCustomOptions.html = text;
        if (title) {
            this.alertCustomOptions.title = title;
        }
        if (closeButtonHtml) {
            this.alertCustomOptions.closeButtonHtml = closeButtonHtml;
        }
        return this.subscribeAlertEvents(handlers);
    }
}
