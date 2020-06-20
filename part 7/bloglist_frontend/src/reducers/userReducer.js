
export const setFilter = (filter) => {
  return{
    type: 'FILTER',
    data: { filter }
  }
}

const reducer = (state = ['',''], action) => {
  if(action.type==='FILTER'){
    state=action.data.filter
  }
  return state
}

export default reducer