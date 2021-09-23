export default class CustomError extends Error {
    status: Number;
    message: any;
    type: String;
    constructor(status: Number, message: String, type: String) {
        super();
        this.status = status;
        this.message = message;
        this.type = type;
    }
}