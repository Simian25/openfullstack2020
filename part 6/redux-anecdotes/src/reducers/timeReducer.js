const reducer = (state = null, action) => {
  switch (action.type) {
  case 'TIMEOUT':
    return action.data.timeOutID
  default:
    return state
  }
}

export default reducer