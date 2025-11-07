export const getError = (
  errors: Record<string, string[]> | undefined | null,
  key: string
) => {
  if (!errors) {
    return null;
  }

  return (errors?.[key]?.[0] as string) || null;
};
