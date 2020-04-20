export interface IConfigUrl {
    fragments: IConfigUrlFragment;
    identity: string;
    profile: string;
    entities: string;
    contacts: string;
    events: string;
    vendors: string;
    gifts: string;
    reports: string;
}

export interface IConfigUrlFragment {
    [index: string]: string;
}
