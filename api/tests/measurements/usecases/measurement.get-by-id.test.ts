import { describe, expect, test } from 'vitest';
import { MeasurementsService } from '../../../src/measurements/domain/services/measurements.service';
import { MeasurementsInMemoryRepository } from '../../../src/measurements/infrastructure/in-memory/measurements.in-memory.repository';
import { randomUUID } from 'crypto';
import {
  Measurement,
  MeasurementType,
} from '../../../src/measurements/domain/models/measurement.model';

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

  test('Retrieve measurement', async () => {
    const foundMeasurement = await service.getById(id);

    expect(foundMeasurement.propsCopy).toStrictEqual(measurementProps);
  });

  test('Not found measurement', async () => {
    await expect(service.getById(randomUUID())).rejects.toThrow(
      'Measurement not found'
    );
  });
});
