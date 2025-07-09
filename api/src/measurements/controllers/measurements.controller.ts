import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import type { MeasurementsService } from '../domain/services/measurements.service';
import { MeasurementSchema } from '../domain/dtos/measurement.dto';
import z from 'zod';

export class MeasurementController {
  private appController = new Hono();

  constructor(private service: MeasurementsService) {
    this.setupEndPoints();
  }

  get app() {
    return this.appController;
  }

  private setupEndPoints() {
    this.appController.post(
      '/',
      zValidator('json', MeasurementSchema),
      async (c) => {
        const data = c.req.valid('json');
        const measurement = await this.service.create(data);

        return c.json(measurement.propsCopy, 201);
      }
    );

    this.appController.get(
      '/:id',
      zValidator('param', z.object({ id: z.string().uuid() })),
      async (c) => {
        const { id } = c.req.valid('param');
        const measurement = await this.service.getById(id);

        return c.json(measurement.propsCopy);
      }
    );
  }
}
