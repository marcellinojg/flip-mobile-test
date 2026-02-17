import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.url("EXPO_PUBLIC_API_URL is required").optional().default('https://recruitment-test.flip.id/frontend-test'),
});

function getRawEnv() {
  return typeof process !== "undefined"
    ? {
        EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
      }
    : {};
}

const parsed = envSchema.parse(getRawEnv());

export const env = {
  API_URL: parsed.EXPO_PUBLIC_API_URL,
} as const;
