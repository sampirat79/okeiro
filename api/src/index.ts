import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono({ strict: false });

app.get('/', (c) => {
  return c.text('Medical Observation API');
});

export default app;
