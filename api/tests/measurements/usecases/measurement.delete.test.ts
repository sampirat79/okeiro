import { describe, expect, test } from 'vitest';
import { MeasurementsService } from '../../../src/measurements/domain/services/measurements.service';
import { MeasurementsInMemoryRepository } from '../../../src/measurements/infrastructure/in-memory/measurements.in-memory.repository';
import { MeasurementType } from '../../../src/measurements/domain/models/measurement.model';
import type { MeasurementDto } from '../../../src/measurements/domain/dtos/measurement.dto';
import { randomUUID } from 'crypto';

describe(MeasurementsService.name, () => {
  const id = randomUUID();
  const measurementProps = {
    id,
    date: new Date(),
    type: MeasurementType.BLOOD,
    observations: [
      {
        loincCode: '718-7',
        value: 1,
        unit: 'g/L',
      },
    ],
  };
  const measurementsRepository = new MeasurementsInMemoryRepository([
    measurementProps,
  ]);
  const service = new MeasurementsService(measurementsRepository);

  test('Delete measurement', async () => {
    await service.delete(id);

    expect(measurementsRepository.length).toBe(0);
  });
});
