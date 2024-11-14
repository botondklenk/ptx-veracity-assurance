export class NotFoundError extends Error {
    constructor(message = "Resource not found") {
        super(message);
        this.name = "NotFoundError";
    }
}

export class BadRequestError extends Error {
    constructor(message = "Bad request") {
        super(message);
        this.name = "BadRequestError";
    }
}