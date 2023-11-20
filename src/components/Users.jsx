import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const userList = useSelector(state => state.userList)
  return(
    <div>
      <h1>
        Users
      </h1>
      <table>
        <thead>
          <tr>
            <th scope='col'>users</th>
            <th scope='col'> blogs created</th>
          </tr>
        </thead>
        {userList.map(user =>
          <tbody key={user.id}>
            <tr>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs === undefined ? null : user.blogs.length}</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  )
}
export default Users