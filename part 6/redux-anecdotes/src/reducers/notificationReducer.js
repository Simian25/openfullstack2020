
export const setNotification = (message, time) => async (dispatch,getState) => {
  clearTimeout(getState().time)
  dispatch({
    type: 'NOTIFICATION',
    data: { message }
  })
  const timeOutID = setTimeout(() => {
    dispatch({
      type: 'RESET'
    })
  }, time * 1000)
  dispatch({
    type: 'TIMEOUT',
    data: { timeOutID }
  })
}


const intitialState = null
const reducer = (state = intitialState, action) => {
  switch(action.type){
  case 'NOTIFICATION':
    state = action.data.message
    return state
  case 'RESET':
    state = null
    return state
  default:
    return state
  }
}

export default reducer