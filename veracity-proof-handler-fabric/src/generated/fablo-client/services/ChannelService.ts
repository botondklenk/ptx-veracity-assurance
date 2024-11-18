/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InvokeBody } from '../models/InvokeBody';
import type { Success } from '../models/Success';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChannelService {
    /**
     * Discover channel
     * @param channelId
     * @returns any OK
     * @throws ApiError
     */
    public static discover(
        channelId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/discover/{channelId}',
            path: {
                'channelId': channelId,
            },
        });
    }
    /**
     * Invoke chaincode operation
     * @param channelId
     * @param chaincodeId
     * @param requestBody
     * @returns Success OK
     * @throws ApiError
     */
    public static invoke(
        channelId: string,
        chaincodeId: string,
        requestBody: InvokeBody,
    ): CancelablePromise<Success> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/invoke/{channelId}/{chaincodeId}',
            path: {
                'channelId': channelId,
                'chaincodeId': chaincodeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
            },
        });
    }
}
