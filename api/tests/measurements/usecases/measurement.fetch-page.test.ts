import { describe, expect, test } from 'vitest';
import { MeasurementsService } from '../../../src/measurements/domain/services/measurements.service';
import { MeasurementsInMemoryRepository } from '../../../src/measurements/infrastructure/in-memory/measurements.in-memory.repository';
import { randomUUID } from 'crypto';
import { MeasurementType } from '../../../src/measurements/domain/models/measurement.model';

describe(MeasurementsService.name, () => {
  const measurementProps1 = {
    id: randomUUID(),
    date: new Date('2020-01-01T00:00:00.000Z'),
    type: MeasurementType.BLOOD,
    observations: [
      {
        loincCode: '718-7',
        value: 1,
        unit: 'g/L',
      },
    ],
  };
  const measurementProps2 = {
    id: randomUUID(),
    date: new Date('2020-02-01T00:00:00.000Z'),
    type: MeasurementType.BLOOD,
    observations: [
      {
        loincCode: '718-7',
        value: 20,
        unit: 'g/dL',
      },
    ],
  };
  const measurementsRepository = new MeasurementsInMemoryRepository([
    measurementProps1,
    measurementProps2,
  ]);
  const service = new MeasurementsService(measurementsRepository);

  test('Query measurements', async () => {
    const foundMeasurements = await service.fetchByQuery({ limit: 1, page: 1 });

    expect(foundMeasurements.data.length).toBe(1);
    expect(foundMeasurements.total).toBe(2);
  });
});
