export = class Response<T> {
    static SUCCESS: string = 'success';
    static ERROR: string = 'error';

    status: string;
    result: T;

    constructor(status: string, result: T) {
        this.status = status;
        this.result = result;
    }
}
