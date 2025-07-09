import type { EntityProps } from '../../../shared/entity';
import type { MeasurementProps } from '../../domain/models/measurement.model';
import type { MeasurementsRepositoryPort } from '../../domain/services/measurements.repository.port';
import { prisma } from './client';

export class MeasurementsPrismaRepository
  implements MeasurementsRepositoryPort
{
  async create(
    data: EntityProps<MeasurementProps>
  ): Promise<EntityProps<MeasurementProps>> {
    return await prisma.measurement.create({
      data: {
        id: data.id,
        date: data.date,
        type: data.type,
        observations: {
          create: data.observations,
        },
      },
      include: {
        observations: true,
      },
    });
  }

  findMany(query: { limit: number; page: number }): Promise<{
    data: EntityProps<MeasurementProps>[];
    limit: number;
    page: number;
    total: number;
  }> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<EntityProps<MeasurementProps> | null> {
    throw new Error('Method not implemented.');
  }
  update(
    data: EntityProps<MeasurementProps>
  ): Promise<EntityProps<MeasurementProps>> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
