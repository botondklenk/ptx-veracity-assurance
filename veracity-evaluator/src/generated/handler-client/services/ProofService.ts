/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Proof } from '../models/Proof';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProofService {
    /**
     * Get all proofs
     * @returns Proof Successful response
     * @throws ApiError
     */
    public static listProofs(): CancelablePromise<Array<Proof>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/proof',
        });
    }
    /**
     * Get proof by ID
     * @param exchangeId
     * @returns Proof Successful response
     * @throws ApiError
     */
    public static getProof(
        exchangeId: string,
    ): CancelablePromise<Proof> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/proof/{exchangeId}',
            path: {
                'exchangeId': exchangeId,
            },
        });
    }
    /**
     * Upload evaluation result
     * @param exchangeId
     * @param participant
     * @param requestBody
     * @returns Proof Successful response
     * @throws ApiError
     */
    public static uploadResultHash(
        exchangeId: string,
        participant: string,
        requestBody: {
            resultHash: string;
        },
    ): CancelablePromise<Proof> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/proof/{exchangeId}/{participant}',
            path: {
                'exchangeId': exchangeId,
                'participant': participant,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
