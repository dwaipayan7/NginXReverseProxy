import { z } from 'zod';

const upstreamSchema = z.object({
  id: z.string(),
  url: z.string().url(),
});

const headersSchema = z.object({
  key: z.string(),
  value: z.string(),
});

const ruleSchema = z.object({
  path: z.string(),
  upstream: z.array(z.string()),
});

const serverSchema = z.object({
  listen: z.number().min(1).max(65535),
  workers: z.number().optional(),
  upstreams: z.array(upstreamSchema),
  headers: z.array(headersSchema).optional(),
  rules: z.array(ruleSchema),
});

export const rootConfigSchema = z.object({
  server: serverSchema,
});
