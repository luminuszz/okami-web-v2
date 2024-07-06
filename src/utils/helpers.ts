import { type ClassValue, clsx } from 'clsx'
import { formatDistance, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export enum LocalStorageKeys {
  theme = '@okami-web:theme',
}

export const BroadCastEvents = {
  newChapterAvailable: 'new-chapter-available',
} as const

export type BroadCastEvent = keyof typeof BroadCastEvents

export const parseDistanceByDate = (date: Date | string) => {
  const dateToParse = typeof date === 'string' ? parseISO(date) : date

  const now = new Date()

  return formatDistance(dateToParse, now, {
    addSuffix: true,
    includeSeconds: true,
    locale: ptBR,
  })
}

export const acceptFileTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/blob',
]

export const validateFileType = (data: FileList | File) => {
  return acceptFileTypes.includes(
    data instanceof FileList ? data?.[0]?.type : data?.type,
  )
}

export const getDefaultImageFile = async () => {
  const response = await fetch('/animes-default.jpg')

  const blob = await response.blob()

  return new File([blob], 'animes-default.jpg', { type: 'image/jpeg' })
}

export const isString = (value: unknown): value is string =>
  typeof value === 'string'

export const isFileList = (value: unknown): value is FileList =>
  value instanceof FileList

const mediaTypes = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
} as const

export function useMediaQuery(media: keyof typeof mediaTypes) {
  const [mediaMatch, setMediaMatch] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(mediaTypes[media])

    setMediaMatch(!mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setMediaMatch(!e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [media])

  return mediaMatch
}

export function parsePageQuery(value: unknown = '1') {
  return z.coerce
    .number()
    .transform((value) => (value > 0 ? value - 1 : 0))
    .parse(value)
}
