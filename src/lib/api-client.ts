export async function parseApiJson<T>(res: Response): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  const json = await res.json();
  if (!res.ok || !json.success) {
    const message =
      typeof json.error === 'string'
        ? json.error
        : res.status === 503
          ? 'Live YouTube data is unavailable. Please try again later.'
          : 'Request failed. Please check your input and try again.';
    return { ok: false, error: message };
  }
  return { ok: true, data: json.data as T };
}
