import z from 'zod';

export const ObservationSchema = z.object({
  loincCode: z.string().regex(/\d+-\d/, 'LOINC code must match format'),
  value: z.number().min(0, 'Value must be positive'),
  unit: z.string().min(1, 'Unit is required'),
});

export type ObservationDto = z.infer<typeof ObservationSchema>;
