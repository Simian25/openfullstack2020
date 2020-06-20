
export const setNotification = (text, type) => {
  if(text&&type){
    return async dispatch => {
      dispatch({ type: 'SHOW_NOTIFICATION', data: {
        text,
        type
      } })
    }
  }
  return async dispatch => {
    dispatch({ type:'HIDE_NOTIFICATION' })
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    return action.data
  case 'HIDE_NOTIFICATION':
    return null
  default:
    return state
  }
}

export default notificationReducer