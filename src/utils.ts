export const getErrorMessage = (err: any) => {
  return err?.error?.message ?? err?.message ?? 'Nieznany błąd';
};
