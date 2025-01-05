export abstract class Error {
    message: string
    code: number

    constructor(_message: string, _code: number) {
        this.message = _message
        this.code = _code
    }
}

export class ClearError extends Error {

}

export class NullExceptionError extends Error {
    
}