import { Model } from '../utils/requests';
import { ProofService as client } from '../generated/handler-client';

class ProofService {
    async listProofs(): Promise<Model<'Proof'>[]> {
        return client.listProofs();
    }

    async getProof(exchangeId: string): Promise<Model<'Proof'>> {
        return client.getProof(exchangeId);
    }
}

export const proofService = new ProofService();