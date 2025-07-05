// Date and time formatting utilities
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const formatDate = (date: string | Date, format = 'MMM D, YYYY'): string => {
  return dayjs(date).format(format)
}

export const formatRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow()
}

export const formatDuration = (hours: number): string => {
  if (hours < 1) {
    return `${hours * 60} min`
  }
  return hours === 1 ? '1 hour' : `${hours} hours`
}

// Price formatting
export const formatPrice = (price: string): string => {
  switch (price) {
    case '€':
      return 'Budget'
    case '€€':
      return 'Moderate'
    case '€€€':
      return 'Expensive'
    case '€€€€':
      return 'Luxury'
    default:
      return price
  }
}

// Text formatting
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

// Number formatting
export const formatCount = (count: number): string => {
  if (count < 1000) return count.toString()
  if (count < 1000000) return `${(count / 1000).toFixed(1)}k`
  return `${(count / 1000000).toFixed(1)}M`
}

export const formatRating = (rating: number): string => {
  return rating.toFixed(1)
}