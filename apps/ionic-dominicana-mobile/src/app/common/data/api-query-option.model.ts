export class ApiQueryOption {
    constructor(
        public page: number = 1,
        public perPage: number = 10,
        public orderBy?: string,
        public where?: string
    ) {
        // to do
    }
}
