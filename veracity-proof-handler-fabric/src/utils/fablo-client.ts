import { OpenAPI, Success } from "../generated/fablo-client";
import { createError } from "./errors";

export function handleFabloCall<ReturnType>(
    apiCall: () => Promise<Success>,
    headers?: any,
): Promise<ReturnType> {
    if (headers?.authorization) {
        OpenAPI.HEADERS = { authorization: headers.authorization };
    }
    return apiCall().then((res) => {
        return res.response as ReturnType;
    }).catch((err) => {
        throw createError(
            err.status,
            err.body.message ?? err.body.mesage // Typo in the fablo code
        );
    });
}