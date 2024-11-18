/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Login
     * @param requestBody
     * @returns any Successful response
     * @throws ApiError
     */
    public static login(
        requestBody: {
            username: string;
            password: string;
        },
    ): CancelablePromise<{
        token: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
