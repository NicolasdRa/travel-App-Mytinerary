import { useState, useEffect } from 'react'
import { apiClient } from '../services'

export const useFetchData = (initialUrl: string | null, initialData: any) => {
  const [data, setData] = useState(initialData)
  const [url, setUrl] = useState(initialUrl)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      // Don't fetch if URL is null or undefined
      if (!url) {
        setIsLoading(false)
        return
      }

      setIsError(false)
      setIsLoading(true)

      try {
        const result = await apiClient.get(url)
        setData(result.data)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [url])

  return { data, isLoading, isError, setUrl }
}
