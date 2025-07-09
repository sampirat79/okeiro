import type { EntityProps } from '../../../shared/entity';
import type { MeasurementProps } from '../models/measurement.model';

export interface MeasurementsRepositoryPort {
  create(
    data: EntityProps<MeasurementProps>
  ): Promise<EntityProps<MeasurementProps>>;
  findById(id: string): Promise<EntityProps<MeasurementProps> | null>;
}
