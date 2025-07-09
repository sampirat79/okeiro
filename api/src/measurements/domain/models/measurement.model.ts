import type { ObservationProps } from './observation.model';
import { Entity } from '../../../shared/entity';

export enum MeasurementType {
  BLOOD = 'BLOOD',
  URINE = 'URINE',
}

export type MeasurementProps = {
  date: Date;
  type: MeasurementType;
  observations: ObservationProps[];
};

export class Measurement extends Entity<MeasurementProps> {}
