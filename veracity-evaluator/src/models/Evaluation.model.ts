import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import { Types } from 'mongoose';


const EVALUATION_STATUSES = ['STARTED', 'ABORTED', 'FINISHED'] as const;
export type EvaluationStatus = typeof EVALUATION_STATUSES[number];

const DATA_TYPES = ['JSON', 'TABULAR'] as const;
export type DataType = typeof DATA_TYPES[number];

const ASPECTS = ['syntax', 'time_range', 'sequential', 'amount'] as const;
export type Aspect = typeof ASPECTS[number];

@modelOptions({ schemaOptions: { _id: false } })
export class Meta {
  @prop()
  public description?: string;

  @prop({ required: true })
  public provider!: string;

  @prop({ required: true })
  public consumer!: string;

  @prop({ required: true, enum: DATA_TYPES })
  public dataType!: DataType;

  @prop()
  public status?: string;

  @prop()
  public timestamp?: string;
}

@modelOptions({ schemaOptions: { _id: false } })
export class Objective {
  @prop({ required: true })
  public description!: string;

  @prop({ required: true, enum: ASPECTS })
  public aspect!: Aspect;

  @prop({ type: () => Object, allowMixed: Severity.ALLOW })
  public evaluation?: Record<string, any>;
}

@modelOptions({ schemaOptions: { _id: false } })
export class VLA {
  @prop({ required: true, type: Meta })
  public meta!: Meta;

  @prop({ required: true, type: () => [Objective] })
  public objectives!: Objective[];
}

@modelOptions({ schemaOptions: { _id: false } })
export class AspectResult {
  @prop()
  public value?: Record<string, any> | null;

  @prop()
  public valid?: boolean | null;
}

export type EvaluationResult = Array<{
  aspect: Aspect;
  result: AspectResult;
}>;

@modelOptions({ schemaOptions: { collection: 'evaluations' } })
export class Evaluation {
  @prop({ required: true, type: Types.ObjectId })
  public _id!: Types.ObjectId;

  @prop({ required: true, enum: EVALUATION_STATUSES })
  public status!: EvaluationStatus;

  @prop({ required: true, type: VLA })
  public vla!: VLA;

  @prop({ type: () => Object, allowMixed: Severity.ALLOW, default: {} })
  public result!: EvaluationResult;
}

export const EvaluationModel = getModelForClass(Evaluation);
