export interface ITuple<T> {
    value: T;
    text: any;
}

export class Tuple<T> implements ITuple<T> {
    constructor(
        public value: T,
        public text: any
    ) { }
}
