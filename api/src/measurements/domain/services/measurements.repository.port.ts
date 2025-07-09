import type { EntityProps } from '../../../shared/entity';
import type { MeasurementProps } from '../models/measurement.model';

export interface MeasurementsRepositoryPort {
  create(
    data: EntityProps<MeasurementProps>
  ): Promise<EntityProps<MeasurementProps>>;
  findMany(query: { limit: number; page: number }): Promise<{
    data: EntityProps<MeasurementProps>[];
    limit: number;
    page: number;
    total: number;
  }>;
  findById(id: string): Promise<EntityProps<MeasurementProps> | null>;
  update(
    data: EntityProps<MeasurementProps>
  ): Promise<EntityProps<MeasurementProps>>;
  delete(id: string): Promise<void>;
}
