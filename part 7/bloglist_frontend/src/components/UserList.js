import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = ({ users }) => {
  return(
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr><th></th><th>Blogs created</th></tr>
          {users.map(user => <tr key={user._id}><td><Link to={`/users/${user._id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
const mapStateToProps = (state) => {
  return{
    users:state.users
  }
}

export default connect(mapStateToProps)(BlogList)