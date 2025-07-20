// THIS IS ALL ABOUT "API ERROR "

class ApiError extends Error {
    constructor (
        statuseCode,
        message="Something went wrong",
        errors = [],
        statck = ""
    ){
        super(message);
        this.statuseCode = statuseCode;
        this.data = null,
        this.message = message,
        this.success = false,
        this.errors = this.errors

        if(stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}