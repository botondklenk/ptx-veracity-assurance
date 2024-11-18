/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Get token
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static getToken(
        requestBody: {
            id?: string;
            secret?: string;
        },
    ): CancelablePromise<{
        token?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/enroll',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Regenerate token
     * @returns any OK
     * @throws ApiError
     */
    public static renewToken(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/reenroll',
        });
    }
    /**
     * Register
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static registerUser(
        requestBody: {
            id?: string;
            secret?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * List users
     * @returns any OK
     * @throws ApiError
     */
    public static listUsers(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/identities',
        });
    }
}
