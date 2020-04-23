export { };
declare global {
    interface Array<T> {
        mapAndFilter<T, Z>(key: string, comparisonValue: string, mapById: string, value: T[]): Z[];
    }
}

Array.prototype.mapAndFilter = <T, Z>(key: string, comparisonValue: string, mapById: string, value: T[]): Z[] => {
    return value.reduce((filtered: Z[], record: T) => {
        if (String(key).toLocaleLowerCase() === String(record[comparisonValue]).toLocaleLowerCase()) {
           filtered.push(record[mapById]);
        }
        return filtered;
      }, []);
};
