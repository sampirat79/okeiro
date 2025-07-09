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

  async fetchByQuery(query: { limit: number; page: number }) {
    const result = await this.repository.findMany(query);
    const data = result.data.map(
      (measurementProps) => new Measurement(measurementProps)
    );

    return {
      ...result,
      data,
    };
  }

  async getById(id: string) {
    const measurementProps = await this.repository.findById(id);
    if (!measurementProps) {
      throw new Error('Measurement not found');
    }

    return new Measurement(measurementProps);
  }

  async update(id: string, data: MeasurementDto) {
    const foundMeasurementProps = await this.repository.findById(id);
    if (!foundMeasurementProps) {
      throw new Error('Measurement not found');
    }

    const measurementProps = await this.repository.update({ id, ...data });

    return new Measurement(measurementProps);
  }

  async delete(id: string) {
    const foundMeasurementProps = await this.repository.findById(id);
    if (!foundMeasurementProps) {
      throw new Error('Measurement not found');
    }

    await this.repository.delete(id);
  }
}
