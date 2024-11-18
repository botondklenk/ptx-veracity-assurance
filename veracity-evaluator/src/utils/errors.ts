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

export class UnauthorizedError extends Error {
    constructor(message = "Unauthorized") {
        super(message);
        this.name = "UnauthorizedError";
    }
}

export class ForbiddenError extends Error {
    constructor(message = "Forbidden") {
        super(message);
        this.name = "ForbiddenError";
    }
}

export function createError(
    statusCode: number, 
    message: string
): Error {
    switch (statusCode) {
        case 400:
            return new BadRequestError(message);
        case 401:
            return new UnauthorizedError(message);
        case 403:
            return new ForbiddenError(message);
        case 404:
            return new NotFoundError(message);
        default:
            return new Error(message);
    }
}