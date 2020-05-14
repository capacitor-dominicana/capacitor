import { ITuple } from "../tuple";

export const DOCUMENT_ID_PATTERNS: Array<ITuple<ITuple<RegExp>>> = [
    {
        text: "do",
        value: {
            text: [/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/],
            value: /^\d{3}\D?\d{7}\D?\d$/gi
        }
    },
    {
        text: "do_rnc",
        value: {
            text: [/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/],
            value: /^\d{3}\D?\d{5}\D?\d$/gi
        }
    }
];
