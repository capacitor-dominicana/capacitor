export { };
declare global {
    interface Storage {
        setObject(key: string, value: object): void;
        getObject<T>(key: string): T;
    }
}

// prefix: ls. backward compatibility - AngularJs
Storage.prototype.setObject = function(key: string, value: object): void {
    this.setItem("ls.".concat(key), JSON.stringify(value));
};

Storage.prototype.getObject = function<T>(key: string): T  {
    const value = this.getItem("ls.".concat(key));
    try {
        return value && JSON.parse(value);
    } catch (e) {
        console.exception(e.message || e);
        return null;
    }
};
