const requiredEnvVars = [
  'NEXT_PUBLIC_SITE_URL',
  // Add other required env vars here
] as const;

export function validateEnv() {
  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missingVars
        .map((varName) => `- ${varName}`)
        .join('\n')}\n\nMake sure these are set in your .env.local file.`
    );
  }
}

export function getEnvVar(name: (typeof requiredEnvVars)[number]): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
