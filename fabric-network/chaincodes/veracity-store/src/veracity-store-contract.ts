import { Context, Contract } from "fabric-contract-api";
import { createHash } from "crypto";
import { VeracityCheck } from "./models";
import { ERROR, InvokeResponse, SUCCESS, get, put } from "./utils";

export class VeracityStoreContract extends Contract {
    constructor() {
        super("VeracityStoreContract");
    }

    async instantiate() {
        // function that will be invoked on chaincode instantiation
    }

    async get(
        ctx: Context, 
        key: string
    ): Promise<InvokeResponse<VeracityCheck>> {
        const check = await get<VeracityCheck>(ctx, key);
        if (!check) return ERROR("CHECK_NOT_FOUND");
        return SUCCESS(check);
    }

    async share(
        ctx: Context, 
        checkId: string, 
        consumer: string, 
        result: string
    ): Promise<InvokeResponse<VeracityCheck>>{
        const check: VeracityCheck = {
            providerResult: JSON.parse(result),
            consumerResult: {},
            status: "shared",
            contractId: "some-id",
        }
        await put(ctx, checkId, check);
        return SUCCESS(check);
    }

    async verify(
        ctx: Context, 
        checkId: string, 
        provider: string,
        result: string
    ): Promise<InvokeResponse<VeracityCheck>>{
        const check = await get<VeracityCheck>(ctx, checkId);
        if (!check) return ERROR("CHECK_NOT_FOUND");
        check.consumerResult = JSON.parse(result);
        if (check.providerResult !== check.consumerResult) {
            check.status = "mismatched";
        }
        else {
            check.status = "verified";
        }
        await put(ctx, checkId, check);
        return SUCCESS(check);
    }


    async putPrivateMessage(ctx: Context, collection: string) {
        const transient = ctx.stub.getTransient();
        const message = transient.get("message");
        await ctx.stub.putPrivateData(collection, "message", message);
        return { success: "OK" };
    }

    async getPrivateMessage(ctx: Context, collection: string) {
        const message = await ctx.stub.getPrivateData(collection, "message");
        const messageString = Buffer.from(message).toString();
        return { success: messageString };
    }

    async verifyPrivateMessage(ctx: Context, collection: string) {
        const transient = ctx.stub.getTransient();
        const message = transient.get("message");
        const messageString = Buffer.from(message).toString();
        const currentHash = createHash("sha256").update(messageString).digest("hex");
        const privateDataHash = (await ctx.stub.getPrivateDataHash(collection, "message")).toString();
        if (privateDataHash !== currentHash) {
            return { error: "VERIFICATION_FAILED" };
        }
        return { success: "OK" };
    }

    async queryAllAssets(ctx: Context): Promise<{ assets: string[] }> {
        console.log("queryAllAssets", ctx.clientIdentity.getMSPID(), ctx.clientIdentity.getID());
        const iterator = await ctx.stub.getQueryResult('{"selector":{}}');
        const assets: string[] = [];
        while (true) {
            const result = await iterator.next();
            if (result.value && result.value.value) {
                assets.push(result.value.value.toString());
            }
            if (result.done) {
                await iterator.close();
                break;
            }
        }
        return { assets };
    }



}