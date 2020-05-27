
export const setFilter = (filter) => {
  return{
    type: 'FILTER',
    data: { filter }
  }
}

const intitialState =''
const reducer = (state = intitialState, action) => {
  if(action.type==='FILTER'){
    state=action.data.filter
  }
  return state
}

export default reducer