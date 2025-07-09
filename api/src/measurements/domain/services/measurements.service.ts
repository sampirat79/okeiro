import { randomUUID } from 'crypto';
import type { MeasurementDto } from '../dtos/measurement.dto';
import type { MeasurementsRepositoryPort } from './measurements.repository.port';
import { Measurement } from '../models/measurement.model';

export class MeasurementsService {
  constructor(private repository: MeasurementsRepositoryPort) {}

  async create(data: MeasurementDto) {
    const id = randomUUID();
    const measurementProps = await this.repository.create({ id, ...data });

    return new Measurement(measurementProps);
  }

  async getById(id: string) {
    const measurementProps = await this.repository.findById(id);
    if (!measurementProps) {
      throw new Error('Measurement not found');
    }

    return new Measurement(measurementProps);
  }
}
