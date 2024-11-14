import express from 'express';
import {
  startEvaluation,
  evaluateData,
  updateEvaluationStatus,
  listEvaluations,
  getEvaluation
}
  from '../controllers/evaluation.controller';
import { getProof, listProofs } from '../controllers/proof.controller';

export function setupRoutes(app: express.Application): void {
  app.get('/evaluation', listEvaluations);
  app.get('/evaluation/:exchangeId', getEvaluation);
  app.put('/evaluation/:exchangeId', startEvaluation);
  app.patch('/evaluation/:exchangeId/evaluate', evaluateData);
  app.patch('/evaluation/:exchangeId/status', updateEvaluationStatus);

  app.get('/proof', listProofs);
  app.get('/proof/:exchangeId', getProof);
}