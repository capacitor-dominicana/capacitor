export { };
declare global {
    interface Lookup {
        getKeyByValue(val: string): any;
    }
}

Storage.prototype.getKeyByValue = function<T>(val: string): any  {
    for (const prop in this) {
        if (this.hasOwnProperty(prop)) {
            if (this[prop] === val) {
                return val;
            }
        }
    }
};
