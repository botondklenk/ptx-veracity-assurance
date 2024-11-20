import { CONFIG } from "../config/environment";
import { OpenAPI as FabloClientConfig, Success, UserService } from "../generated/fablo-client";
import { createError } from "./errors";

let authorization: string | undefined;

export async function handleFabloCall<ReturnType>(
    apiCall: () => Promise<Success>
): Promise<ReturnType> {
    if (!authorization) {
        await setAuthorization();
    }

    try {
        return (await apiCall()).response as ReturnType;
    } catch (error: any) {
        if (error.status === 403) {
            try {
                await setAuthorization();
                return (await apiCall()).response as ReturnType;
            } catch (retryError: any) {
                throw createError(
                    retryError.status,
                    retryError.body.message || retryError.body.mesage
                );
            }
        } else {
            throw createError(
                error.status,
                error.body.message || error.body.mesage
            );
        }
    }
}

async function setAuthorization() {
    FabloClientConfig.TOKEN = (await UserService.getToken(
        {
            id: CONFIG.fabloUsername,
            secret: CONFIG.fabloPassword
        }
    )).token;
}