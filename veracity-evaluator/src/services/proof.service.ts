import { Model } from '../utils/requests';

class ProofService {
    async listProofs(): Promise<Model<'Proof'>[]> {
        throw new Error('Method not implemented.');
    }

    async getProof(exchangeId: string): Promise<Model<'Proof'>> {
        throw new Error('Method not implemented.');
    }
}

export const proofService = new ProofService();