import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { MeasurementController } from './measurements/controllers/measurements.controller';
import 'dotenv/config';
import { MeasurementsService } from './measurements/domain/services/measurements.service';
import { MeasurementsInMemoryRepository } from './measurements/infrastructure/in-memory/measurements.in-memory.repository';

const measurementsRepository = new MeasurementsInMemoryRepository([]);
const measurementsService = new MeasurementsService(measurementsRepository);
const measurementController = new MeasurementController(measurementsService);

const port = parseInt(process.env.PORT || '3000');

const app = new Hono({ strict: false });

app.route('/measurements', measurementController.app);

app.get('/', (c) => {
  return c.text('Medical Observation API');
});

export default app;
