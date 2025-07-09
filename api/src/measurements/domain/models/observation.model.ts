import { Entity } from '../../../shared/entity';

export type ObservationProps = {
  loincCode: string;
  value: number;
  unit: string;
};

export class Observation extends Entity<ObservationProps> {}
