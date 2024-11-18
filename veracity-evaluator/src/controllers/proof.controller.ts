import { GET } from '../utils/requests';
import { proofService } from '../services/proof.service';
import { handleHandlerCall } from '../utils/handler-client';

export const listProofs = GET<'/proof'>(
  async (params, query) => {
    return await handleHandlerCall(() => proofService.listProofs());
  }
);

export const getProof = GET<'/proof/{exchangeId}'>(
  async (params, query) => {
    return await handleHandlerCall(() => proofService.getProof(params.exchangeId));
  }
);