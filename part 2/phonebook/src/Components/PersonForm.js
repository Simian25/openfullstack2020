import React from 'react'


const PersonForm = ({onSubmit,onNameChange,onNumberChange,newName,newNumber}) => {


    return(
        <div>
            <form onSubmit= {onSubmit}>
        <div>
         <p> name: <input onChange={onNameChange} value={newName}/></p>
          <p>number: <input onChange={onNumberChange} value ={newNumber}/></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
        </div>
    )
}
export default PersonForm;