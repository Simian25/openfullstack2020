import React from 'react'
import { connect } from 'react-redux'


const Error = ({ notification }) => {
  const notificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if(notification&&notification.type==='error'){
    return (
      <div style={notificationStyle}>
        {notification.text}
      </div>
    )
  }else{
    return null
  }
}

const mapStateToProps = (state) => {
  return{
    notification:state.notification
  }
}

export default connect(mapStateToProps)(Error)