import { Injectable, InjectionToken, ElementRef } from "@angular/core";
import * as moment from "moment";
import * as _ from "lodash";

/**
 * Own
 */
// models
import { Identifier } from "@capacitor/shared/decorators";
import { UTIL_SERVICE_TOKEN } from "../tokens";
import { IUtilService } from "./util.service.model";

// helpers
import { ITuple, BrowserEngine } from "@capacitor/shared/helpers";

@Injectable()
@Identifier({
    token: UTIL_SERVICE_TOKEN
})
export class UtilService implements IUtilService {

    public startsWith(text: string, pattern: string): boolean {
        let result: boolean;
        if (text && pattern) {
            result = text.slice(-pattern.length) === pattern;
        }
        return result;
    }

    public uuidv4(): string {
      // Update, 2017-06-28 - An RFC4122 version 4 compliant solution
      // https://stackoverflow.com/a/2117523
      return ([1e7].toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) =>
        // tslint:disable-next-line:no-bitwise
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    }

    public getCCExpFormat(expDate: string): string {
        let format = "Invalid CC Exp";
        if (expDate.length === 6) {
            format = expDate.substr(4, 2).concat("/", expDate.substring(0, 4));
        }
        return format;
    }

    public getCardNumberMask(cardNumber: string, withScript: boolean): string {
        if (cardNumber) {
            const format: string = (withScript) ? "XXXX-XXXX-XXXX-" : "XXXXXXXXXXXX";
            cardNumber = (cardNumber) ? (cardNumber.length <= 4 ? (format + cardNumber) : cardNumber) : "N/A";
        }
        return cardNumber;
    }

    public getBase64Image(image: HTMLImageElement, onlyDataURL: boolean): string {
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        let context: CanvasRenderingContext2D;
        let dataURL: string;

        canvas.width = image.width;
        canvas.height = image.height;
        context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);

        // firefox supports PNG and JPEG. You could check img.src to guess the original format, but be aware the using "image/jpg"
        // will re-encode the image
        dataURL = canvas.toDataURL("image/png");
        return (onlyDataURL) ? dataURL.replace(/^data:image\/(png|jpg);base64,/, "") : dataURL;
    }

    public getMonths(momentLib: any, qtyFrom?: number): Array<ITuple<any>> {
      const _moment = moment || momentLib;
      let months: string[];
      let result: Array<ITuple<any>>;
      if (_moment) {
          months = _moment.months();
          if (months.length) {
              if (!isNaN(qtyFrom)) {
                  // better than splice, it preserves index (+performance than _moment().month())
                  months = _.map(months, (month: string, idx: number) => {
                      if (idx < qtyFrom) {
                          month = null;
                      }
                      return month;
                  });
              }
              result = new Array();
              _.each((months), (month: string, idx: number) => {
                  if (month) {
                      result.push({
                      value: (idx + 1),
                      text: month
                    } as ITuple<any>);
                }
              });
          }
      }
      return result;
    }

    public getYears(qtyFrom?: number, qtyTo?: number): Array<ITuple<any>> {
        const $self = this;
        const getYear: number = new Date().getFullYear();
        let len: number;
        let result: Array<ITuple<any>>;
        const addYears = (qty: number, right?: boolean) => {
            if (!isNaN(qty)) {
                if (right) {
                    for (let i = 0; i < qty; i++) {
                        result.push({
                            value: i,
                            text: (getYear + i)
                        } as ITuple<any>);
                    }
                } else {
                    for (let i = 0; i < qty; i++) {
                        result.push({
                            value: i,
                            text: ((getYear - qty) + i)
                        } as ITuple<any>);
                    }
                }
            }
        };

        if (moment != null) {
            len = (qtyFrom && !isNaN(qtyFrom)) ? qtyFrom : 0;
            len += (qtyTo && !isNaN(qtyTo)) ? qtyFrom + qtyTo : 0;
            result = [];
            addYears(qtyFrom ? qtyFrom : 5);
            addYears(qtyTo ? qtyTo : 20, true);
        }
        return result;
    }

    public getDeviceName(): BrowserEngine {
                const name = "unknown";
                const userAgent: string = window.navigator.userAgent;
                const browsers: object = {
                    msie: /internet explorer/i,
                    ie11: /Trident\/7\./,
                    edge: /edge/i,
                    chrome: /chrome/i,
                    safari: /safari/i,
                    firefox: /firefox/i
                };

                for (const key in browsers) {
                if (browsers[key].test(userAgent)) {
                    if (key === "internet explorer" || key === "ie11") {
                        return BrowserEngine.msie;
                    }
                    return BrowserEngine[key];
                }
            }
    }

    public getTokenValue(token: InjectionToken<any>): string {
        if (token && typeof token === "object" && ((token as any)._desc)) {
            const characters: string[] = token.toString().split(" ");
            if (characters.length) {
                return characters[1];
            }
        }
        return "Unkwnown";
    }

    public getKeyByValue(object: object, value: any): any {
        // Lodash equivalent: https://stackoverflow.com/a/18435833/2904959 (invert instead)
        for (const prop in object) {
            if (this.hasOwnProperty(prop)) {
                 if (this[prop] === value) {
                     return prop;
                 }
            }
        }
    }

    public format(sentence: string, ...args: any[]): string {
        // JavaScript equivalent to printf/string.format
        // Solution that allows for argument formatting, based on actual .NET code:
        // https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format

        const format: string = args[0];
        let result = "";

        for (let i = 0; ;) {
            // find the next opening or closing brace
            const open = format.indexOf("{", i);
            const close = format.indexOf("}", i);
            if ((open < 0) && (close < 0)) {
                // not found: copy the end of the string and break
                result += format.slice(i);
                break;
            }
            if ((close > 0) && ((close < open) || (open < 0))) {
                if (format.charAt(close + 1) !== "}") {
                    throw new Error("format stringFormatBraceMismatch");
                }

                result += format.slice(i, close + 1);
                i = close + 2;
                continue;
            }

            // copy the string before the brace
            result += format.slice(i, open);
            i = open + 1;

            // check for double braces (which display as one and are not arguments)
            if (format.charAt(i) === "{") {
                result += "{";
                i++;
                continue;
            }

            if (close < 0) {
                throw new Error("format stringFormatBraceMismatch");
            }

            // find the closing brace
            // get the string between the braces, and split it around the ":" (if any)
            const brace = format.substring(i, close);
            const colonIndex = brace.indexOf(":");
            const argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10) + 1;

            if (isNaN(argNumber)) {
                throw new Error("format stringFormatInvalid");
            }

            const argFormat = (colonIndex < 0) ? "" : brace.substring(colonIndex + 1);
            let arg = args[argNumber];
            if (typeof (arg) === "undefined" || arg === null) {
                arg = "";
            }

            result += arg.toString();
            i = close + 1;
        }
        return result;
    }

    public capitalizeTransform(text: string, camelCase: boolean, concatLiteral?: string): string {
        let fullString: string = text || "";
        fullString = ((camelCase)
            ? text.charAt(0).toLowerCase()
            : text.charAt(0).toUpperCase())
            .concat(text.slice(1));

        return (concatLiteral) ? fullString.concat(concatLiteral) : fullString;
    }

    public stringToDate(text: string): Date {
        const strToNum: number = Date.parse(text);
        if (isNaN(strToNum)) {
            return null;
        }
        let newDate: Date = new Date(text);
        return newDate = new Date(newDate.setDate(newDate.getDate() + 1));
    }

    public timeToDate(text: string): Date {
        if (text) {
            return null;
        }
        return moment(text, ["h:m A", "H:m"]).toDate();
    }

    public concatDateWithTime(dateValue: Date, timeValue: Date): Date {
        if (!dateValue || !timeValue || isNaN(Date.parse(dateValue.toDateString())) || isNaN(Date.parse(timeValue.toDateString()))) {
            return null;
        }
        return new Date(dateValue.getFullYear()
            , dateValue.getMonth()
            , dateValue.getDate()
            , timeValue.getHours()
            , timeValue.getMinutes()
            , timeValue.getSeconds()
            , timeValue.getMilliseconds()
        );
    }

    public getFullTimeInFormat12(customDate?: Date): string {
        // get current UTC - e.g.: Dominican Republic (base)
        const countryUTCBase = {
            timeZoneName: "short",
            timeZone: "America/Santo_Domingo"
        };
        customDate = new Date((customDate as any).toString("es", countryUTCBase));
        let hours = (customDate) ? customDate.getHours() : new Date().getHours();
        let minutes: string | number = customDate.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour "0" should be "12"
        minutes = minutes < 10 ? "0" + minutes : minutes;
        const strTime = ("00" + hours.toString()).substring(hours.toString().length) + ":" + minutes + " " + ampm;
        return strTime;
    }

    public paddy(value: string, padCount: number, character?: string): string {
        return ((character || "0").repeat(padCount) + value).slice(-padCount);
    }

    public compare(phrase: string, compareTo: string): boolean {
        let result: boolean;
        if (phrase && compareTo && compareTo !== "") {
            result = phrase.toLowerCase().indexOf(compareTo.toLowerCase()) !== -1;
        }
        return result;
    }

    public cleanText(value: string): string {
        return value ? value : "";
    }

    public addNumbers(firstNumber: any, secondNumber: any): number {
        return (parseInt(firstNumber as string, null) || 0) + ((parseInt(secondNumber as string, null) || 0));
    }

    public flattenObject(obj: object, prefix?: any, current?: object, delegate?: (currentObject: ITuple<string>) => void): object {
        prefix = prefix || [];
        current = current || {};

        // Remember kids, null is also an object!
        if (typeof(obj) === "object" && obj !== null) {
            Object.keys(obj).forEach(key => {
                this.flattenObject(obj[key], prefix.concat(key), current, delegate);
            });
        } else {
            current[prefix.join(".")] = obj;
            if (delegate) {
                delegate({
                    value: prefix.join("."),
                    text: obj
                 });
            }
        }
        return current;
    }

    //#region Images
    public readImageFromURL(inputFile: File, elemId: string): void {
        const updateImgAttribute = (val: any) => {
            const imgElemRef = document.querySelector("#".concat(elemId));
            if (imgElemRef) {
                imgElemRef.setAttribute("src", val);
            }
        };

        if (inputFile) {
            const reader = new FileReader();

            reader.onload = ($evt: any) => {
                    updateImgAttribute($evt.target.result);
            }
            reader.readAsDataURL(inputFile);
        } else {
                updateImgAttribute("");
        }
    }

    public onLoadDOMImgError($evt: any): void {
        $evt.target.src = "/assets/img/placeholder-no-image.png";
    }
   //#endregion
}
