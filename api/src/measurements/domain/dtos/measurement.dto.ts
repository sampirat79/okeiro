import z from 'zod';

import { ObservationSchema } from './observation.dto';
import { MeasurementType } from '../models/measurement.model';

export const MeasurementSchema = z.object({
  date: z
    .string()
    .datetime('Date must be a date')
    .transform((str) => new Date(str)),
  type: z.nativeEnum(MeasurementType),
  observations: z
    .array(ObservationSchema)
    .min(1, 'Observations cannot be empty'),
});

export type MeasurementDto = z.infer<typeof MeasurementSchema>;
