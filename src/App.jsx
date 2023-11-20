import { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import UserSubmitForm from './components/UserSubmitForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Bloginfo from './components/BlogInfo'
import { useDispatch,useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, userLogin } from './reducers/userReducer'
import { fetchUsers } from './reducers/userListReducer'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import { Table, Form, Button } from 'react-bootstrap'
const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const userList = useSelector(state => state.userList)
  const match = useMatch('/users/:id')
  const individualUser = match
    ? userList.find(indiUser => indiUser.id === match.params.id)
    : null
  //effects
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(fetchUsers())
  }, [])
  const blogs = useSelector(state => state.blogs.slice().sort((a,b) => b.likes-a.likes))
  const blogMatch = useMatch('/blogs/:id')
  console.log('blogs in app',blogs)
  const individualBlog = blogMatch ? blogs.find(blg => blg.id === blogMatch.params.id) : null
  console.log('testing',individualBlog)
  // console.log('in app',blogs)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // console.log('herein',user)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])
  console.log('eldorade',user)
  //helper functions
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('trying to login')
    const signInInfo = { username: event.target.username.value , password: event.target.password.value }
    console.log(signInInfo)
    dispatch(userLogin(signInInfo))
    dispatch(setNotification('Logged in Successfully',6))
    navigate('/blogs')
  }
  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const blogListDiv = () => (
    <div>
      <Togglable buttonLabel="Add blog">
        <UserSubmitForm userId={user.id}/>
      </Togglable>
      {blogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} key={blog.id}>
          {/* {console.log('mimiinin',user.id)} */}
          <Blog className="blog" key={blog.id} blog={blog} />
        </Link>
      ))}
    </div>
  )
  //exercise 5.1
  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control type="text" name="username"/>
          <Form.Label>password:</Form.Label>
          <Form.Control type="password" name="password"/>
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
  //exercise 5.2
  const logout = () => {
    return <button onClick={handleLogout}>LogOut</button>
  }
  const padding = {
    padding: 5
  }

  return (
    <div className='container'>
      {user === null ? (
        loginForm()
      ) : (
        <>
          <div className='navBar'>
            <Link to = '/users'style={padding}>users</Link>
            <Link to = '/blogs'style={padding}>blogs</Link>
            {user===null?null:<>{user.name} has logged in{logout()}</>}
          </div>
          <Notification/>
          <div>
            <h1>BLOG APP</h1>
          </div>
          <Routes>
            {individualBlog === null ? null : <Route path ='/blogs/:id' element={<Bloginfo blog={individualBlog} adb={individualBlog.user.name} useId={user.id}/>}/>}
            <Route path ='/users/:id' element={<User user={individualUser}/>}/>
            <Route path = '/users' element = {<Users />}/>
            <Route path = '/blogs' element = {blogListDiv()}/>
          </Routes>
        </>
      )}
    </div>
  )
}
export default App