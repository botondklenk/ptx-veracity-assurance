import { CONFIG } from '../config/environment';
import { ChannelService as client } from '../generated/fablo-client';

export class ProofService {
    async getAllProofs() {
        return await client.invoke(
            CONFIG.channel,
            CONFIG.chaincode,
            {
                method: 'queryProofs',
                args: []
            }
        );
    }

    async getProofById(exchangeId: string) {
        return client.invoke(
            CONFIG.channel,
            CONFIG.chaincode,
            {
                method: 'getProof',
                args: [
                    exchangeId
                ]
            }
        );
    }

    async uploadEvaluationResult(
        exchangeId: string,
        participant: string,
        resultHash: string
    ) {
        return client.invoke(
            CONFIG.channel,
            CONFIG.chaincode,
            {
                method: 'uploadResultHash',
                args: [
                    exchangeId,
                    participant,
                    resultHash
                ]
            }
        );
    }
}
