import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createNewBlog } from '../reducers/blogReducer'
const UserSubmitForm = ({ userId }) => {
  const dispatch = useDispatch()
  const handleUserFormSubmission = (event) => {
    console.log('clicked submit')
    console.log(event)
    event.preventDefault()
    console.log(userId)
    const content = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: event.target.likes.value,
      user: userId,
    }
    console.log('user clicked submit',content)
    dispatch(createNewBlog(content))
    dispatch(setNotification(`Added ${event.target.title.value} by ${event.target.author.value}`,6))
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    event.target.likes.value = ''
  }
  return (
    <div>
      <form onSubmit={handleUserFormSubmission} className="userForm">
        <label>Title</label>
        <input type="text" name="title" placeholder="enter title here" id="blogTitle"/>
        <br />
        <label>Author</label>
        <input type="text" name="author" placeholder="enter author here" id="blogAuthor"/>
        <br />
        <label>url</label>
        <input type="text" name="url" placeholder="enter url here" id="blogUrl"/>
        <br />
        <label>likes</label>
        <input type="text" name="likes" placeholder="enter likes here" id="blogLikes"/>
        <br />
        <button type="submit" id="saveBlog">
          save
        </button>
      </form>
    </div>
  )
}

export default UserSubmitForm
