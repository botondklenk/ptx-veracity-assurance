import { Context } from "fabric-contract-api";

export async function get<Type>(
    ctx: Context, 
    key: string
): Promise<Type | null>{
    const buffer = await ctx.stub.getState(key);
    if (!buffer || !buffer.length) return null;
    const value = JSON.parse(buffer.toString());
    delete value.docType;
    return value;
}

export async function put<Type>(
    ctx: Context, 
    key: string, 
    value: Type, 
    docType: string
): Promise<void> {
    const typedValue = JSON.parse(JSON.stringify(value)) as any;
    typedValue["docType"] = docType;
    await ctx.stub.putState(key, Buffer.from(JSON.stringify(typedValue)));
}

export async function query<Type>(
    ctx: Context, 
    query: { selector: any },
    docType: string
    ): Promise<Type[]> {
    query.selector.docType = docType;
    const iterator = await ctx.stub.getQueryResult(JSON.stringify(query));
    const results: Type[] = [];
    while (true) {
        const result = await iterator.next();
        if (result.value && result.value.value) {
            const value = JSON.parse(result.value.value.toString());
            delete value.docType;
            results.push(value);
        }
        if (result.done) {
            await iterator.close();
            break;
        }
    }
    return results;
}