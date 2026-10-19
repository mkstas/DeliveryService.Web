import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_HOST: z.url('NEXT_PUBLIC_API_HOST must be valid URL'),
  NEXT_PUBLIC_API_PREFIX: z.string().min(1, 'NEXT_PUBLIC_API_PREFIX cannot be empty'),
});

const env = envSchema.safeParse({
  NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
  NEXT_PUBLIC_API_PREFIX: process.env.NEXT_PUBLIC_API_PREFIX,
});

if (!env.success) {
  throw new Error(
    `Incorrect environment configuration:\n${env.error.issues.map(issue => `- ${issue.message}`).join('\n')}`,
  );
}

export const API_HOST = env.data.NEXT_PUBLIC_API_HOST;
export const API_PREFIX = env.data.NEXT_PUBLIC_API_PREFIX;
export const API_URL = `${API_HOST}/${API_PREFIX}`;
