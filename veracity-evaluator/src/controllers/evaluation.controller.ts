import { GET, PATCH, PUT } from '../utils/requests';
import { evaluationService } from '../services/evaluation.service';

export const listEvaluations = GET<'/evaluation'>(
  async (params, query) => {
    return await evaluationService.listEvaluations();
  }
);

export const getEvaluation = GET<'/evaluation/{exchangeId}'>(
  async (params, query) => {
    return await evaluationService.getEvaluation(params.exchangeId);
  }
);

export const startEvaluation = PUT<'/evaluation/{exchangeId}'>(
  async (params, query, body) => {
    return evaluationService.startEvaluation(params.exchangeId, body.vla);
  }
);

export const evaluateData = PATCH<'/evaluation/{exchangeId}/evaluate'>(
  async (params, query, body) => {
    return evaluationService.evaluateData(params.exchangeId, body.resourceId, body.data);
  }
);

export const updateEvaluationStatus = PATCH<'/evaluation/{exchangeId}/status'>(
  async (params, query, body) => {
    return evaluationService.updateStatus(params.exchangeId, body.status);
  }
);