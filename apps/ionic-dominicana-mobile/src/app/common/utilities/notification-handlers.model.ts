export interface INotificationHandlers {
    /**
     * Function to run after popup DOM has been updated.
     * Typically, this will happen after `Swal.fire()` or `Swal.update()`.
     * If you want to perform changes in the popup's DOM, that survive `Swal.update()`, `onRender` is a good place.
     */
    render?<T>($event: T): void;

    /**
     * Function to run when popup built, but not shown yet. Provides popup DOM element as the first argument.
     *
     */
    beforeOpen?<T>($event: T): void;
    /**
     * Function to run after popup DOM has been updated.
     * Typically, this will happen after `Swal.fire()` or `Swal.update()`.
     * If you want to perform changes in the popup's DOM, that survive `Swal.update()`, `onRender` is a good place.
     */
    open?<T>($event: T): void;

    /**
     * Function to run when popup closes by user interaction (and not by another popup), provides popup DOM element
     * as the first argument.
     */
    close?<T>($event: T): void;

    /**
     * Function to run after popup has been disposed by user interaction (and not by another popup).
     *
     */
    afterClose?(): void;
}
