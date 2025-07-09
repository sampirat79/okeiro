import { describe, expect, test } from 'vitest';
import { MeasurementsService } from '../../../src/measurements/domain/services/measurements.service';
import { MeasurementsInMemoryRepository } from '../../../src/measurements/infrastructure/in-memory/measurements.in-memory.repository';
import { MeasurementType } from '../../../src/measurements/domain/models/measurement.model';
import type { MeasurementDto } from '../../../src/measurements/domain/dtos/measurement.dto';

describe(MeasurementsService.name, () => {
  const measurementsRepository = new MeasurementsInMemoryRepository([]);
  const service = new MeasurementsService(measurementsRepository);

  test('Create measurement', async () => {
    const data: MeasurementDto = {
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
    await service.create(data);

    expect(measurementsRepository.length).toBe(1);
  });
});
