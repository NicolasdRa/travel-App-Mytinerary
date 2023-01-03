import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { v4 as uuidv4 } from 'uuid'

import { geoApiOptions } from './geoDbApiConfig'
import axios from 'axios'
import { FormControl, Stack } from '@mui/material'
import { useDebounce } from '../../../hooks/useDebounce'

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
// const GOOGLE_MAPS_API_KEY = 'AIzaSyC3aviU6KHXAjoSnxcw6qbOhjnFctbxPkE'

// function loadScript(src: string, position: HTMLElement | null, id: string) {
//   if (!position) {
//     return
//   }

//   const script = document.createElement('script')
//   script.setAttribute('async', '')
//   script.setAttribute('id', id)
//   script.src = src
//   position.appendChild(script)
// }

// const autocompleteService = { current: null }

// interface MainTextMatchedSubstrings {
//   offset: number
//   length: number
// }
// interface StructuredFormatting {
//   main_text: string
//   secondary_text: string
//   main_text_matched_substrings?: readonly MainTextMatchedSubstrings[]
// }
// interface PlaceType {
//   description: string
//   structured_formatting: StructuredFormatting
// }

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
  target: string
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
      console.log('fetching...')

      //TODO: add a check for the target and make the request to the correct endpoint or make it dynamic

      const options = {
        url: `/cities`,
        ...geoApiOptions,
        params: { namePrefix: query, types: 'CITY' },
      }
      const res = await axios(options)
      return res.data.data
    }

    if (inputValue.length > 2) {
      fetch(debouncedQuery).then((data) => {
        setOptions(data)
      })
    }
  }, [debouncedQuery])

  // pushes the value up to the parent component when the user selects an option
  useEffect(() => {
    if (value) {
      handleAutcompleteValueChange(value)
    }
  }, [value])

  return (
    <Stack>
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.id === value.id}
        id={name}
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
          const matches = match(option.name, inputValue, {
            insideWords: true,
          })
          const parts = parse(option.name, matches)

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
