import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import UserSubmitForm from './components/UserSubmitForm'
import Togglable from './components/Togglable'
import { useDispatch,useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, userLogin } from './reducers/userReducer'
// import  store from "./reducers/store";
const App = () => {
  // console.log(store.getState())
  const dispatch = useDispatch()
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  const user = useSelector(state => state.user)
  // console.log('in app',user)
  //effects
  useEffect(() => {dispatch(initializeBlogs())}, [])
  const blogs = useSelector(state => state.blogs.slice().sort((a,b) => b.likes-a.likes))
  // console.log('in app',blogs)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('herein',user)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])
  //helper functions
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('trying to login')
    const signInInfo = { username: event.target.username.value , password: event.target.password.value }
    console.log(signInInfo)
    dispatch(userLogin(signInInfo))
    // try {
    //   const user = await loginService.login({
    //     username,
    //     password,
    //   })
    //   window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    //   //setting user token here
    //   blogService.setToken(user.token)
    //   setUser(user)
    //   setUsername('')
    //   setPassword('')
    //   dispatch(setNotification(`${username} has logged in`,6))
    //   console.log('lalala', user.id)
    // } catch (exception) {
    //   console.log('error',exception)
    // }
  }
  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const blogListDiv = () => (
    <div>
      {blogs.map((blog) => (
        <Blog className="blog" key={blog.id} blog={blog} useID={user.id} />
      ))}
    </div>
  )
  //exercise 5.1
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          name='username'
          id="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          name='password'
          id="password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  //exercise 5.2
  const logout = () => {
    return <button onClick={handleLogout}>LogOut</button>
  }

  return (
    <>
      <Notification/>
      {user === null ? (
        loginForm()
      ) : (
        <>
          <div>
            <h2>blogs</h2>
            <p>{user.name} has logged in</p>
            {logout()}
            <Togglable buttonLabel="Add blog">
              <UserSubmitForm userId={user.id}/>
            </Togglable>
            {console.log('chihihi', user.id)}
            {blogListDiv()}
          </div>
        </>
      )}
    </>
  )
}
export default App
