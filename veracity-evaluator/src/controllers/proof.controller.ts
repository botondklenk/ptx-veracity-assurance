import { GET } from '../utils/requests';
import { proofService } from '../services/proof.service';

export const listProofs = GET<'/proof'>(
  async (params, query) => {
    return await proofService.listProofs();
  }
);

export const getProof = GET<'/proof/{exchangeId}'>(
  async (params, query) => {
    return await proofService.getProof(params.exchangeId);
  }
);