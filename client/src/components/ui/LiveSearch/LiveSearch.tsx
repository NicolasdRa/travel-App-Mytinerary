import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

import { Autocomplete, Stack, TextField, Alert } from '@mui/material'

import { geoApiOptions } from './geoDbApiConfig'
import { useDebounce } from '../../../hooks/useDebounce'
import { useAppSelector } from '../../../redux/hooks'
import { selectAllCities } from '../../../redux/citiesSlice'
import { geoDbRateLimiter, citySearchCache } from '../../../utils/rateLimiter'
import { City } from '../../../@types/types'

interface GeoDBCityOption {
  city: string
  country: string
  countryCode: string
  id: number | string
  latitude: number
  longitude: number
  name: string
  population: number
  region: string
  regionCode: string
  type: 'CITY' | 'COUNTRY' | 'REGION'
  wikiDataId: string
}

interface LiveSearchProps {
  name: string
  target: 'cities' | 'itineraries' | 'activities'
  handleAutcompleteValueChange: (e: any) => void
}

export const LiveSearch: React.FC<LiveSearchProps> = ({
  name,
  target,
  handleAutcompleteValueChange,
}) => {
  const [value, setValue] = useState<GeoDBCityOption | null>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [options, setOptions] = useState<GeoDBCityOption[]>([])
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [retryAfter, setRetryAfter] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Use local Redux store cities as fallback
  const localCities = useAppSelector(selectAllCities)

  const debouncedQuery = useDebounce(inputValue, 1000) // Increased debounce to 1 second

  // Fallback to local search when rate limited
  const searchLocal = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase()
    const filtered = localCities
      .filter((city: City) => 
        city.name.toLowerCase().includes(lowerQuery) ||
        city.country?.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 10)
      .map((city: City): GeoDBCityOption => ({
        id: city._id || '',
        city: city.name,
        name: city.name,
        country: city.country || 'Unknown',
        countryCode: city.countryCode || 'XX',
        latitude: city.coord?.lat || 0,
        longitude: city.coord?.lon || 0,
        population: city.population || 0,
        region: '',
        regionCode: '',
        type: 'CITY' as const,
        wikiDataId: ''
      }))
    return filtered
  }, [localCities])

  useEffect(() => {
    const fetch = async (query: string) => {
      // Check cache first
      const cacheKey = `${target}-${query}`
      const cached = citySearchCache.get(cacheKey)
      if (cached) {
        return cached
      }

      // Check rate limit
      if (!geoDbRateLimiter.canMakeRequest()) {
        const retry = geoDbRateLimiter.getRetryAfter()
        setIsRateLimited(true)
        setRetryAfter(Math.ceil(retry / 1000)) // Convert to seconds
        
        // Use local search as fallback
        return searchLocal(query)
      }

      try {
        setIsLoading(true)
        geoDbRateLimiter.recordRequest()
        
        const options = {
          url: `/${target}`,
          ...geoApiOptions,
          params: { namePrefix: query, limit: '10' },
        }
        const res = await axios(options)
        const data = res.data.data
        
        // Cache the result
        citySearchCache.set(cacheKey, data)
        
        setIsRateLimited(false)
        return data
      } catch (error: any) {
        console.error('GeoDB API error:', error)
        
        // If we get a 429 error, mark as rate limited
        if (error.response?.status === 429) {
          setIsRateLimited(true)
          setRetryAfter(60) // Default 60 seconds
        }
        
        // Fallback to local search
        return searchLocal(query)
      } finally {
        setIsLoading(false)
      }
    }

    if (inputValue.length > 2) {
      fetch(debouncedQuery).then((data) => {
        setOptions(data || [])
      })
    } else {
      setOptions([])
    }
  }, [debouncedQuery, inputValue.length, target, searchLocal])

  //  Pushes the value up to the parent component to be handled by the form. The "name" attribute is NOT ACCESIBLE in the Autocomplete component
  useEffect(() => {
    if (value) {
      handleAutcompleteValueChange(value)
    }
  }, [value, handleAutcompleteValueChange])

  // Clear rate limit message after timeout
  useEffect(() => {
    if (isRateLimited && retryAfter > 0) {
      const timer = setTimeout(() => {
        setRetryAfter(prev => Math.max(0, prev - 1))
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isRateLimited, retryAfter])

  return (
    <Stack spacing={1}>
      {isRateLimited && retryAfter > 0 && (
        <Alert severity="warning" sx={{ fontSize: '0.75rem', py: 0.5 }}>
          Rate limit reached. Using local data. Retry in {retryAfter}s
        </Alert>
      )}
      <Autocomplete
        loading={isLoading}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        id={`${name}-autocomplete`}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.name
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        noOptionsText="No locations"
        onChange={(_event: React.SyntheticEvent, newValue: GeoDBCityOption | null) => {
          setValue(newValue)
        }}
        onInputChange={(_event: React.SyntheticEvent, newInputValue: string) => {
          setInputValue(newInputValue)
        }}
        renderInput={(params) => {
          return (
            <TextField
              color="secondary"
              ref={params.InputProps.ref}
              required
              size="small"
              fullWidth
              label="Add a city"
              inputProps={{
                ...params.inputProps,
                name: name,
              }}
            />
          )
        }}
        renderOption={(props, option, { inputValue }) => {
          const optionString = `${option.name}, ${option.country}`

          const matches = match(optionString, inputValue, {
            insideWords: true,
          })
          const parts = parse(optionString, matches)

          return (
            <li {...props} key={uuidv4()}>
              <div>
                {parts.map((part) => (
                  <span
                    key={uuidv4()}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          )
        }}
      />
    </Stack>
  )
}
