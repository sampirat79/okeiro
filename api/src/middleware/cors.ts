import { cors } from 'hono/cors';

export const corsMiddleware = (port: number) =>
  cors({
    origin: [`http://localhost:${port}`, 'http://localhost:5173'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
  });
