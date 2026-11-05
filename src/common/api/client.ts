import { API_URL } from '@/common/config';

export class HttpError extends Error {
  readonly status: number;
  readonly serverMessage: string | undefined;

  constructor(status: number, serverMessage?: string) {
    super(serverMessage ?? `Request failed with status ${status}`);
    this.name = 'HttpError';
    this.status = status;
    this.serverMessage = serverMessage;
  }
}

type HttpOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

const readErrorMessage = async (res: Response): Promise<string | undefined> => {
  try {
    const data = (await res.json()) as { message?: unknown };

    if (typeof data.message === 'string') {
      return data.message;
    }

    if (Array.isArray(data.message)) {
      return data.message.filter((message): message is string => typeof message === 'string').join(', ');
    }
  } catch {
    return undefined;
  }

  return undefined;
};

export const http = async <T>(path: string, options: HttpOptions = {}): Promise<T> => {
  const { body, headers, ...rest } = options;

  const res = await fetch(`${API_URL}/${path.replace(/^\/+/, '')}`, {
    ...rest,
    credentials: 'include',
    ...(body !== undefined && { body: JSON.stringify(body) }),
    headers: {
      ...(body !== undefined && { 'Content-type': 'application/json; charset=UTF-8' }),
      ...headers,
    },
  });

  if (!res.ok) {
    throw new HttpError(res.status, await readErrorMessage(res));
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const text = await res.text();

  return (text ? JSON.parse(text) : undefined) as T;
};
