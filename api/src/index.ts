import { Hono } from 'hono';
import { MeasurementController } from './measurements/controllers/measurements.controller';
import 'dotenv/config';
import { MeasurementsService } from './measurements/domain/services/measurements.service';
// import { MeasurementsPrismaRepository } from './measurements/infrastructure/prisma/measurements.prisma.repository';
import { MeasurementsInMemoryRepository } from './measurements/infrastructure/in-memory/measurements.in-memory.repository';
import { corsMiddleware } from './middleware/cors';
import 'dotenv/config';

// const measurementsRepository = new MeasurementsPrismaRepository();
const measurementsRepository = new MeasurementsInMemoryRepository([]);
const measurementsService = new MeasurementsService(measurementsRepository);
const measurementController = new MeasurementController(measurementsService);

const app = new Hono({ strict: false });

const port = parseInt(process.env.PORT || '3000');

app.use('*', corsMiddleware(port));

app.route('/measurements', measurementController.app);

app.get('/', (c) => {
  return c.text('Medical Observation API');
});

export default app;
