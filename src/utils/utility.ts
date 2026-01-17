import type { ClassValue } from 'clsx'
import { loop } from '@hairy/utils'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface RetryOptions {
  retries?: number
  delay?: number
}

export function retry<T>(fn: () => Promise<T>, options: RetryOptions = {}) {
  const { retries = 5, delay = 1000 } = options
  let retriesLeft = retries
  return loop(async (next) => {
    try {
      await fn()
    }
    catch (error) {
      retriesLeft--
      if (retriesLeft > 0)
        next(delay)
      throw error
    }
  })
}
