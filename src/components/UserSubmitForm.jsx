import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
const UserSubmitForm = ({ createBlog, userId }) => {
  const dispatch = useDispatch()
  //states
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')
  //handlers
  const handleTitle = (event) => {
    console.log(event.target.value)
    setTitle(event.target.value)
  }
  const handleAuthor = (event) => {
    console.log(event.target.value)
    setAuthor(event.target.value)
  }
  const handleUrl = (event) => {
    console.log(event.target.value)
    setUrl(event.target.value)
  }
  const handleLikes = (event) => {
    console.log(event.target.value)
    setLikes(event.target.value)
  }
  const handleUserFormSubmission = (event) => {
    console.log('clicked submit')
    event.preventDefault()
    console.log(userId)
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes,
      user: userId,
    })
    dispatch(setNotification(`Added ${title} by ${author}`,6))
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }
  return (
    <div>
      <form onSubmit={handleUserFormSubmission} className="userForm">
        <label>Title</label>
        <input
          type="text"
          value={title}
          name="Title"
          onChange={handleTitle}
          placeholder="enter title here"
          id="blogTitle"
        ></input>
        <br />
        <label>Author</label>
        <input
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthor}
          placeholder="enter author here"
          id="blogAuthor"
        ></input>
        <br />
        <label>url</label>
        <input
          type="text"
          value={url}
          name="URL"
          onChange={handleUrl}
          placeholder="enter url here"
          id="blogUrl"
        ></input>
        <br />
        <label>likes</label>
        <input
          type="text"
          value={likes}
          name="Likes"
          onChange={handleLikes}
          placeholder="enter likes here"
          id="blogLikes"
        ></input>
        <br />
        <button type="submit" id="saveBlog">
          save
        </button>
      </form>
    </div>
  )
}

export default UserSubmitForm
