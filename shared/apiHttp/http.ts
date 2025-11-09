import { mapError } from "../errors/errorMapper"

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean | null | undefined>
  filters?: Record<string, string | number | boolean | null | undefined>
  headers?: Record<string, string>
  body?: unknown
  raw?: boolean // se quer a resposta pura (Response)
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000'

function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | null | undefined>,
  filters?: Record<string, string | number | boolean | null | undefined>
): string {
  const url = new URL(endpoint, BASE_URL)
  const allParams = { ...params, ...filters }

  for (const [key, value] of Object.entries(allParams)) {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value))
    }
  }

  return url.toString()
}

async function handleError(response: Response) {
  let message = 'Erro desconhecido.'
  try {
    const data = await response.json()
    message = mapError(data).message
  } catch {
    /* ignore */
  }

  const err = new Error(message)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(err as any).status = response.status
  throw err
}

async function request<T>(
  method: HttpMethod,
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, filters, headers, body, raw, ...rest } = options
  const url = buildUrl(endpoint, params, filters)

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  }

  if (body && method !== 'GET') config.body = JSON.stringify(body)

  const response = await fetch(url, config)

  if (!response.ok) await handleError(response)

  if (raw) return (response as unknown) as T
  return (await response.json()) as T
}

export const http = {
  get: <T>(endpoint: string, options?: RequestOptions) => request<T>('GET', endpoint, options),
  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>('POST', endpoint, { ...options, body }),
  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>('PUT', endpoint, { ...options, body }),
  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>('PATCH', endpoint, { ...options, body }),
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>('DELETE', endpoint, options),
}
