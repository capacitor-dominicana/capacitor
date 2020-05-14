import { InjectionToken, ElementRef } from "@angular/core";

/**
 * Own
 */
import { ITuple } from "@capacitor/shared/helpers";
import { BrowserEngine } from "@capacitor/shared/helpers";

export interface IUtilService {
    uuidv4(): string;
    getCCExpFormat(expDate: string): string;
    getCardNumberMask(cardNumber: string, withScript: boolean): string;
    getBase64Image(image: HTMLImageElement, onlyDataURL: boolean): string;
    getMonths(momentLib: any, qtyFrom?: number): Array<ITuple<any>>;
    getYears(qtyFrom?: number, qtyTo?: number): Array<ITuple<any>>;
    getDeviceName(): BrowserEngine;
    getKeyByValue(object: object, value: any);
    getTokenValue(token: InjectionToken<any>): string;
    startsWith(text: string, pattern: string): boolean;
    format(sentence: string, ...args: any[]): string;
    capitalizeTransform(text: string, camelCase: boolean, concatLiteral?: string): string;
    stringToDate(text: string): Date;
    timeToDate(text: string): Date;
    concatDateWithTime(dateValue: Date, timeValue: Date): Date;
    paddy(value: string, padCount: number, character?: string): string;
    getFullTimeInFormat12(customDate?: Date): string;
    compare(phrase: string, compareTo: string): boolean;
    cleanText(value: string): string;
    addNumbers(firstNumber: any, secondNumber: any): number;

    /**
     * Recursively flattens a JSON object using dot notation.
     *
     * NOTE: input must be an object as described by JSON spec. Arbitrary
     * JS objects (e.g. {a: () => 42}) may result in unexpected output.
     * MOREOVER, it removes keys with empty objects/arrays as value (see
     * examples bellow).
     *
     * @example
     * // returns {a:1, 'b.0.c': 2, 'b.0.d.e': 3, 'b.1': 4}
     * flatten({a: 1, b: [{c: 2, d: {e: 3}}, 4]})
     * // returns {a:1, 'b.0.c': 2, 'b.0.d.e.0': true, 'b.0.d.e.1': false, 'b.0.d.e.2.f': 1}
     * flatten({a: 1, b: [{c: 2, d: {e: [true, false, {f: 1}]}}]})
     * // return {a: 1}
     * flatten({a: 1, b: [], c: {}})
     *
     * @param obj item to be flattened
     * @param { Array.string } [prefix=[]] chain of prefix joined with a dot and prepended to key
     * @param { Object } [current={}] result of flatten during the recursion
     *
     * @see https://docs.mongodb.com/manual/core/document/#dot-notation
     */
    flattenObject(obj: object, prefix?: any, current?: object, delegate?: (currentObject: ITuple<string>) => void): object;
    readImageFromURL(inputFile: File, elemId: string): void;
    onLoadDOMImgError($evt: any): void;
}
