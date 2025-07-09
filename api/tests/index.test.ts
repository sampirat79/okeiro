import { describe, expect, test } from 'vitest';
import app from '../src/index';

describe('Index', () => {
  test('GET /', async () => {
    const res = await app.request('/');
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Medical Observation API');
  });
});
