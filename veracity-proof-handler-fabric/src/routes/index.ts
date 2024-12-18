import express from 'express';
import { getAllProofs, getProofById, uploadEvaluationResult } from '../controllers/proof.controller';

export function setupRoutes(app: express.Application): void {
  app.get('/proof', getAllProofs);
  app.get('/proof/:exchangeId', getProofById);
  app.patch('/proof/:exchangeId/:participant', uploadEvaluationResult);
}