import { Context, Contract } from "fabric-contract-api";
import { VeracityProof } from "./models";
import { ERROR, InvokeResponse, SUCCESS, get, put, query } from "./utils";

export class VeracityProofHandlerContract extends Contract {
    constructor() {
        super("VeracityStoreContract");
    }

    async instantiate() {
        // function that will be invoked on chaincode instantiation
    }

    async getProof(
        ctx: Context,
        exchangeId: string
    ): Promise<InvokeResponse<VeracityProof>> {
        const proof = await get<VeracityProof>(ctx, exchangeId);
        if (!proof) throw ERROR("Proof not found");
        return SUCCESS(proof);
    }

    async uploadResultHash(
        ctx: Context,
        exchangeId: string,
        paricipant: string,
        resultHash: string
    ): Promise<InvokeResponse<VeracityProof>> {
        let proof = await get<VeracityProof>(ctx, exchangeId);
        if (proof) {
            proof.results[paricipant] = resultHash;

            const hashes = [];
            for (const participant in proof.results) {
                const resultHash = proof.results[participant];
                hashes.push(resultHash);
            }

            proof.match = hashes.every((hash, i, arr) => hash === arr[0]);
        } else {
            proof = {
                exchangeId,
                results: {
                    [paricipant]: resultHash
                },
                match: true
            };
        }
        await put(ctx, exchangeId, proof, "veracityProof");
        return SUCCESS(proof);
    }

    async queryProofs(ctx: Context): Promise<InvokeResponse<VeracityProof[]>> {
        const selector = {}
        const result = await query<VeracityProof>(ctx, { selector }, "veracityProof");
        return SUCCESS(result);
    }
}