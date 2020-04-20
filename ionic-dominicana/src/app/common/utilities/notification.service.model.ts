import { SweetAlertOptions } from "sweetalert2";
import * as Swal from "sweetalert2";

/**
 * Own
 */
import { Progress } from "../../shared/toogles/progress.enum";
import { INotificationHandlers } from "./notification-handlers.model";
import { ITuple } from "@app/shared/tuple";

export interface INotificationService {
    alertCustomOptions: SweetAlertOptions;
    success(message: string, title?: string, closeTitle?: string, handlers?: INotificationHandlers): Promise<Swal.SweetAlertResult>;
    error(message: string, title?: string, closeTitle?: string, handlers?: INotificationHandlers): Promise<Swal.SweetAlertResult>;
    warning(message: string, title?: string, closeTitle?: string, handlers?: INotificationHandlers): Promise<Swal.SweetAlertResult>;
    info(message: string, title?: string, closeTitle?: string, handlers?: INotificationHandlers): Promise<Swal.SweetAlertResult>;
    confirm(
        message: string|ITuple<string>,
        title?: string, confirmText?: string,
        cancelText?: string, closeTitle?: string,
        handlers?: INotificationHandlers): Promise<Swal.SweetAlertResult>;
    custom(html: string): void;
    toggleProgressBar(status: Progress): void;
    toggleSnackBar(status: Progress, message: string, action?: string): void;
    applyCustomOrDefaultAlertOptions(newOptions?: SweetAlertOptions): SweetAlertOptions;
}
