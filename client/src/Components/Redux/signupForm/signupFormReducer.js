const initialState = {
  setOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_OPEN_SIGNUP':
      return {
        ...state,
        setOpen: true
      }
    case 'SET_CLOSE_SIGNUP':
      return {
        ...state,
        setOpen: false
      }

    default:
      return state
  }
}
