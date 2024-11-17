import { Context } from "fabric-contract-api";
import { get, put } from "./utils";

export interface VeracityProof {
    exchangeId: string;
    results: Record<string, string>;
    match: boolean;
}