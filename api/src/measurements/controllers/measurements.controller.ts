import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import type { MeasurementsService } from '../domain/services/measurements.service';
import { MeasurementSchema } from '../domain/dtos/measurement.dto';

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
  }
}
