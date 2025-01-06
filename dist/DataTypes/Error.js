export class Error {
    constructor(_message, _code) {
        this.message = _message;
        this.code = _code;
    }
}
export class ClearError extends Error {
}
export class NullExceptionError extends Error {
}
