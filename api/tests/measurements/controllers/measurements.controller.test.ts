import { describe, expect, test } from 'vitest';
import { MeasurementController } from '../../../src/measurements/controllers/measurements.controller';
import { MeasurementsInMemoryRepository } from '../../../src/measurements/infrastructure/in-memory/measurements.in-memory.repository';
import { MeasurementsService } from '../../../src/measurements/domain/services/measurements.service';
import type { MeasurementDto } from '../../../src/measurements/domain/dtos/measurement.dto';
import { MeasurementType } from '../../../src/measurements/domain/models/measurement.model';

describe(MeasurementController.name, () => {
  const measurementsRepository = new MeasurementsInMemoryRepository([]);
  const measurementsService = new MeasurementsService(measurementsRepository);
  const app = new MeasurementController(measurementsService).app;

  describe('POST /measurements', () => {
    test('Valid creation', async () => {
      const body: MeasurementDto = {
        date: new Date('2000-01-01T00:00:00.000Z'),
        type: MeasurementType.BLOOD,
        observations: [
          {
            loincCode: '718-7',
            value: 1,
            unit: 'g/L',
          },
        ],
      };
      const expected = {
        date: '2000-01-01T00:00:00.000Z',
        type: 'BLOOD',
        observations: [
          {
            loincCode: '718-7',
            value: 1,
            unit: 'g/L',
          },
        ],
      };

      const res = await app.request('/', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });
      const result = await res.json();
      expect(res.status).toBe(201);
      expect(result.id).toBeDefined();
      expect(result).toMatchObject(expected);
    });

    test('Invalid date', async () => {
      const body: MeasurementDto = {
        date: 'Hello world' as unknown as Date,
        type: MeasurementType.BLOOD,
        observations: [
          {
            loincCode: '718-7',
            value: 1,
            unit: 'g/L',
          },
        ],
      };
      const expected = {
        error: {
          issues: [
            {
              code: 'invalid_string',
              message: 'Date must be a date',
              path: ['date'],
              validation: 'datetime',
            },
          ],
          name: 'ZodError',
        },
        success: false,
      };

      const res = await app.request('/', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });
      expect(res.status).toBe(400);
      expect(await res.json()).toStrictEqual(expected);
    });

    test('Empty observations', async () => {
      const body: MeasurementDto = {
        date: new Date(),
        type: MeasurementType.BLOOD,
        observations: [],
      };
      const expected = {
        error: {
          issues: [
            {
              code: 'too_small',
              exact: false,
              inclusive: true,
              message: 'Observations cannot be empty',
              minimum: 1,
              path: ['observations'],
              type: 'array',
            },
          ],
          name: 'ZodError',
        },
        success: false,
      };

      const res = await app.request('/', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });
      expect(res.status).toBe(400);
      expect(await res.json()).toStrictEqual(expected);
    });
  });
});
