import { Context } from "fabric-contract-api";

export type InvokeResponse<T> = { error: string } | { success: T };

export function ERROR(message: string): InvokeResponse<null> {
    return { error: message };
}

export function SUCCESS<Type>(value: Type): InvokeResponse<Type> {
    return { success: value };
}

export async function get<Type>(ctx: Context, key: string): Promise<Type | null>{
    const buffer = await ctx.stub.getState(key);
    if (!buffer || !buffer.length) return null;
    return JSON.parse(buffer.toString());
}

export async function put<Type>(ctx: Context, key: string, value: Type): Promise<void> {
    await ctx.stub.putState(key, Buffer.from(JSON.stringify(value)));
}