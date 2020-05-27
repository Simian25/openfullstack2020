
export const setMessage = (message) => {
  return{
    type: 'NOTIFICATION',
    data: { message }
  }
}
export const resetMessage = () => {
  return{
    type:'RESET'
  }
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