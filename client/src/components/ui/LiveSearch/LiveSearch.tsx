import { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

import { Autocomplete, Stack, TextField } from '@mui/material'

import { geoApiOptions } from './geoDbApiConfig'
import { useDebounce } from '../../../hooks/useDebounce'
import { useAppSelector } from '../../../redux/hooks'
import { selectAllCities } from '../../../redux/citiesSlice'

interface CityOption {
  city: string
  country: string
  countryCode: string
  id: number
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
  const [value, setValue] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [options, setOptions] = useState<any[]>([])

  const debouncedQuery = useDebounce(inputValue, 500)

  useEffect(() => {
    const fetch = async (query: string) => {
      const options = {
        url: `/${target}`,
        ...geoApiOptions,
        params: { namePrefix: query, limit: '10' },
      }
      const res = await axios(options)
      return res.data.data
    }

    if (inputValue.length > 2) {
      fetch(debouncedQuery).then((data) => {
        setOptions(data)
      })
    }
  }, [debouncedQuery, inputValue.length, target])

  //  Pushes the value up to the parent component to be handled by the form. The "name" attribute is NOT ACCESIBLE in the Autocomplete component
  useEffect(() => {
    if (value) {
      handleAutcompleteValueChange(value)
    }
  }, [value, handleAutcompleteValueChange])

  return (
    <Stack>
      <Autocomplete
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
        onChange={(event: React.SyntheticEvent, newValue: string) => {
          setOptions(newValue ? [newValue, ...options] : options)
          setValue(newValue)
        }}
        onInputChange={(event: React.SyntheticEvent, newInputValue: string) => {
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
                {parts.map((part, index) => (
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
