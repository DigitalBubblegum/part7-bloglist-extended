import { useSelector } from 'react-redux'

const Users = () => {
  const userList = useSelector(state => state.userList)
  return(
    <div>
      <h1>
        Users
      </h1>
      <table>
        <thead>
          <td></td>
          <td><b>blogs created</b></td>
        </thead>
        {userList.map(user =>
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.blogs === undefined ? null : user.blogs.length}</td>
          </tr>
        )}
      </table>
    </div>
  )
}
export default Users