import { useState, useEffect } from 'react'
import { apiClient } from '../services'
import { AxiosError } from 'axios'

interface UseRequestReturn {
  data: any
  loading: boolean
  error: AxiosError | null
}

const useRequest = (url: string): UseRequestReturn => {
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<AxiosError | null>(null)

  useEffect(() => {
    let ignore = false
    const fetchProduct = async () => {
      setLoading(true)
      try {
        setError(null)
        const response = await apiClient.get(url)
        if (!ignore) setData(response.data)
      } catch (err) {
        if (!ignore) setError(err as AxiosError)
      }
      setLoading(false)
    }
    fetchProduct()
    return () => {
      ignore = true
    }
  }, [url])

  return { data, loading, error }
}

export default useRequest