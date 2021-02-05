import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useRequest = (url) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})

  useEffect(() => {
    let ignore = false
    const fetchProduct = async () => {
      setLoading(true)
      try {
        setError({})
        const response = await axios(url)
        if (!ignore) setData(response.data)
      } catch (err) {
        setError(err)
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
