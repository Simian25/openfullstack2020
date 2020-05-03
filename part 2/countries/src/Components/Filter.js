import React from 'react'

const Filter = ({onChange,input}) =>{

    return(
        <div>
            filter shown with <input onChange={onChange} value={input}/>

        </div>

    )
}

export default Filter;