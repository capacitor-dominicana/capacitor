export function IntlPhoneValidator(controlId: string, ...args: any[]) {
    const windoObj = (window as any);
    const inputElem = document.querySelector(`#${(controlId || "")}`);
    if (inputElem) {
        const iti = windoObj.intlTelInputGlobals.getInstance(inputElem);
        if (iti.isValidNumber()) {
            return null;
        } else if (!(inputElem as any).required && !(inputElem as any).value.length) {
            return null;
        }
    }

    return {
        isValid: false
    };
}
