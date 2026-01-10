export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-08'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  // Defensive check: If it's a string, strip quotes and whitespace
  if (typeof v === 'string') {
    const cleaned = v.replace(/["']/g, '').trim();
    // If it became empty after cleaning, treat it as undefined/missing if you want strictness,
    // but here we just return the cleaned value to avoid format errors.
    if (!cleaned) throw new Error(errorMessage);
    return cleaned as T;
  }

  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
