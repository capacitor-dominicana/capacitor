export class IBaseRoverArgs {
    constructor(public page?: number, public offset?: number){
        page = page ?? 1;
        offset = offset ?? 25;
    }
}
