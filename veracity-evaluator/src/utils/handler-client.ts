import { createError } from "./errors";

export async function handleHandlerCall<ReturnType>(
    apiCall: () => Promise<ReturnType>,
    retries = 5
): Promise<ReturnType> {

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await apiCall();
        } catch (error: any) {
            if (error.body?.error === 'MVCC_READ_CONFLICT' && attempt < retries) {
                // Log and retry after a short delay
                console.warn(`MVCC conflict detected, retrying... (${attempt}/${retries})`);
                await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
            } else {
                throw createError(error.status, error.body?.error || 'Unknown error');
            }
        }
    }

    throw createError(500, 'Exceeded retry attempts for MVCC conflict');
}