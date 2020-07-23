const initialState = {
  setOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_OPEN':
      return {
        ...state,
        setOpen: true
      }
    case 'SET_CLOSE':
      return {
        ...state,
        setOpen: false
      }

    default:
      return state
  }
}
