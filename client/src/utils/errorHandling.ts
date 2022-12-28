import { MyError } from '../@types/types'

export const isError = (
  toBeDetermined: any | MyError
): toBeDetermined is MyError => {
  return !!(toBeDetermined as MyError)?.message
}
