import { useState, useMemo, useCallback } from 'react'

interface UsePaginationProps<T> {
  data: T[]
  itemsPerPage?: number
}

export const usePagination = <T>({ 
  data, 
  itemsPerPage = 12 
}: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = useMemo(() => 
    Math.ceil(data.length / itemsPerPage), 
    [data.length, itemsPerPage]
  )

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }, [data, currentPage, itemsPerPage])

  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }, [totalPages])

  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }, [])

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }, [totalPages])

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1)
    }
  }, [hasNextPage])

  // For infinite scroll/load more pattern
  const allLoadedData = useMemo(() => {
    const endIndex = currentPage * itemsPerPage
    return data.slice(0, endIndex)
  }, [data, currentPage, itemsPerPage])

  return {
    currentPage,
    totalPages,
    paginatedData,
    allLoadedData,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    goToPage,
    loadMore,
    itemsPerPage
  }
}