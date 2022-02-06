export async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  if (!response.ok) {
      throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
}
