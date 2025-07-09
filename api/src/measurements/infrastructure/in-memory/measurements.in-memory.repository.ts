import { randomUUID } from 'crypto';
import type { MeasurementDto } from '../../domain/dtos/measurement.dto';
import {
  Measurement,
  type MeasurementProps,
} from '../../domain/models/measurement.model';
import type { MeasurementsRepositoryPort } from '../../domain/services/measurements.repository.port';
import type { EntityProps } from '../../../shared/entity';

export class MeasurementsInMemoryRepository
  implements MeasurementsRepositoryPort
{
  constructor(private measurements: EntityProps<MeasurementProps>[]) {}

  get length() {
    return this.measurements.length;
  }

  async create(
    measurementProps: EntityProps<MeasurementProps>
  ): Promise<EntityProps<MeasurementProps>> {
    this.measurements = [...this.measurements, measurementProps];

    return measurementProps;
  }

  async findById(id: string): Promise<EntityProps<MeasurementProps> | null> {
    const measurementProps = this.measurements.find(
      (measurement) => measurement.id === id
    );

    return measurementProps || null;
  }

  async update(
    measurementProps: EntityProps<MeasurementProps>
  ): Promise<EntityProps<MeasurementProps>> {
    const measurements = this.measurements.filter(
      (measurement) => measurement.id !== measurementProps.id
    );
    this.measurements = [...measurements, measurementProps];

    return measurementProps;
  }
}
