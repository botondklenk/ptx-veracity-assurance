import { CONFIG } from "../config/environment";
import { OpenAPI as HandlerApiConfig, UserService } from "../generated/handler-client";
import { createError } from "./errors";

let authorization: string | undefined;

export async function handleHandlerCall<ReturnType>(
    apiCall: () => Promise<ReturnType>,
): Promise<ReturnType> {
    if (!authorization) {
        await setAuthorization();
    }
    let error: any;
    let response!: ReturnType;
    await apiCall().then(
        (res) => { response = res }
    ).catch(
        (err) => { error = err; }
    );
    if (error && error.status === 403) {
        await setAuthorization();
        await apiCall().then(
            (res) => { response = res }
        ).catch(
            (err) => { error = err; }
        );
    }
    if (error) {
        throw createError(
            error.status,
            error.body.error
        );
    }
    return response;
}

async function setAuthorization() {
    HandlerApiConfig.TOKEN = (await UserService.login(
        {
            username: CONFIG.handlerUsername,
            password: CONFIG.handlerPassword
        }
    )).token;
    console.log("Authorization set");
    console.log(HandlerApiConfig.HEADERS);
}