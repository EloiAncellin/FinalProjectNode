export = class Response<T> {
    static SUCCESS: string = 'success';
    static ERROR: string = 'error';

    status: string;
    code: number;
    result: T;

    constructor(status: string, code: number, result: T) {
        this.status = status;
        this.code = code;
        this.result = result;
    }
}
