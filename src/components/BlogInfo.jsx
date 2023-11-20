import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { increaseBlogLikes,addCommentToBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
// const BlogInfo = ({ blog, addedBy, id, useID, likesUpdater }) => {
const BlogInfo = ({ blog,adb, useID }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  if(!blog){
    return null
  }
  if(!blog.user){
    return null
  }
  // console.log({ blog, addedBy, id, useID, likesUpdater })
  const likesUpdater = () => {
    // console.log(typeof blog.likes)
    const changedBlogLikes = {
      ...blog,
      likes: blog.likes + 1
    }
    // console.log('click',changedBlogLikes)
    dispatch(increaseBlogLikes(changedBlogLikes,blog.id))
  }
  const removeItem =  () => {
    let confirm = window.prompt(
      `are you sure you want to delete ${blog.title} by ${blog.author} type yes to confirm`,
    )
    if (confirm.toLocaleLowerCase() === 'yes') {
      // console.log('deleted')
      dispatch(setNotification(`${blog.title} is being deleted from the db`,1))
      dispatch(deleteBlog(blog.id))
      navigate('/blogs')

      // window.location.reload()
    } else if (confirm.toLocaleLowerCase() === 'no') {
      console.log('clicked no')
    } else {
      window.alert('invalid input try again')
    }
  }
  const handleFormSubmit = (event) => {
    //completed exercise 7.19
    event.preventDefault()
    console.log(event.target.comment.value)
    const content = event.target.comment.value
    const changedBlogComments = {
      ...blog,
      comments: blog.comments.concat(content)
    }
    // console.log('click',changedBlogLikes)
    dispatch(addCommentToBlog(changedBlogComments,blog.id))
    event.target.comment.value=''
  }
  return (
    <div>
      <h1>{blog.title} by {blog.author}</h1>
      <br />
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes}{' '}
      <button onClick={likesUpdater} className="likeButton">
        like
      </button>
      <br />
      {adb}
      {blog.user.name}
      <br />
      {useID === blog.user.id ? (
        <button className="deletion" onClick={removeItem}>
          delete
        </button>
      ) : <p>bleh</p>}
      <h2>comments</h2>
      <form onSubmit={handleFormSubmit}><input placeholder='enter a comment here for the others' type='text' name='comment'></input><button type='submit' id='saveBlogComment'>save</button></form>
      {blog.comments === null? null : blog.comments.map(comment => <>&bull;{comment}<br/></>)}
    </div>
  )
}
export default BlogInfo
