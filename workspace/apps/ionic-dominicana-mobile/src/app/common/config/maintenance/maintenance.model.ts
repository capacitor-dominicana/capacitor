export interface IAppMaintenance {
    scheduled: boolean;
    data: {
        title: string,
        message: string,
        datetime: Date
    };
}
