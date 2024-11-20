import { OpenAPI } from '../generated/fablo-client';
import { ProofService } from '../services/proof.service';
import { handleFabloCall } from '../utils/fablo-client';
import { GET, Model, PATCH, PUT } from '../utils/requests';

const proofService = new ProofService();

export const getAllProofs = GET<'/proof'>(
  async (params, query, headers) => {
    return await handleFabloCall<Model<'Proof'>[]>(
        () => proofService.getAllProofs(), 
    );
  }
);

export const getProofById = GET<'/proof/{exchangeId}'>(
  async (params, query, headers) => {
    return await handleFabloCall<Model<'Proof'>>(
        () => proofService.getProofById(params.exchangeId),
    );
  }
);

export const uploadEvaluationResult = PATCH<'/proof/{exchangeId}/{participant}'>(
  async (params, query, body, headers) => {
    return await handleFabloCall<Model<'Proof'>>(
        () => proofService.uploadEvaluationResult(
          params.exchangeId, 
          params.participant, 
          body.resultHash
        ),
    );
  }
);