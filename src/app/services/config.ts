/* eslint-disable @typescript-eslint/no-explicit-any */

import { CustomError } from './custom-error';
import { z } from 'zod';
import { replacer, silentParse } from '@/utils/config.util';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const EmptyShape = {};
type EmptyShape = typeof EmptyShape;

interface RequestInitWithSchema<T extends z.ZodRawShape> extends RequestInit {
  shape?: T;
}

const getApiResponseOkSchema = <T extends z.ZodRawShape>(rawShape: T) =>
  z
    .object({ ok: z.literal(true), statusCode: z.number() })
    .merge(z.object(rawShape))
    .strict();

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const FETCH_REVALIDATE_TIME = 60; // 1분

class Instance {
  constructor(private readonly baseUrl: string = BASE_URL ?? '') {}

  async fetchWithConfig<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    method: HttpMethod,
    body?: any,
    options: RequestInitWithSchema<T> = {},
  ) {
    const { shape, ...pureOptions } = options;
    const config: RequestInit = {
      method,
      next: { revalidate: FETCH_REVALIDATE_TIME },
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...pureOptions?.headers,
      },
      ...(body && { body: JSON.stringify(body, replacer) }),
    };

    const schema = shape
      ? getApiResponseOkSchema(shape)
      : // NOTE this `as T` is safe because `shape` is undefined
        getApiResponseOkSchema(EmptyShape as T);

    const res = await fetch(new URL(url, this.baseUrl).toString(), config);

    try {
      // response가 있는 경우
      const data = await res.json();

      if (!data.ok) {
        throw new CustomError(
          data.statusCode,
          data.error?.message || '알 수 없는 오류',
        );
      }

      return silentParse(schema, data);
    } catch (e) {
      console.error(e);
      // response가 없는 경우
      if (res.status >= 400) {
        throw new CustomError(
          res.status,
          e instanceof Error ? e.message : '알 수 없는 오류',
        );
      }
      return silentParse(schema, {
        ok: true,
        statusCode: res.status,
      });
    }
  }

  async get<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    options?: RequestInitWithSchema<T>,
  ) {
    return this.fetchWithConfig<T>(url, 'GET', undefined, options);
  }
  async delete<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithConfig<T>(url, 'DELETE', undefined, options);
  }
  async post<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    body: any,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithConfig<T>(url, 'POST', body, options);
  }
  async put<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    body: any,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithConfig<T>(url, 'PUT', body, options);
  }
  async patch<T extends z.ZodRawShape = EmptyShape>(
    url: string,
    body: any,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithConfig<T>(url, 'PATCH', body, options);
  }
}

export const instance = new Instance();
