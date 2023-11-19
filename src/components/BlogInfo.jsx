import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
const BlogInfo = ({ blog, addedBy, id, useID, likesUpdater }) => {
  console.log({ blog, addedBy, id, useID, likesUpdater })
  const dispatch = useDispatch()
  const removeItem =  () => {
    let confirm = window.prompt(
      `are you sure you want to delete ${blog.title} by ${blog.author} type yes to confirm`,
    )
    if (confirm.toLocaleLowerCase() === 'yes') {
      console.log('deleted')
      dispatch(setNotification(`${blog.title} is being deleted from the db`,1))
      dispatch(deleteBlog(blog.id))

      // window.location.reload()
    } else if (confirm.toLocaleLowerCase() === 'no') {
      console.log('clicked no')
    } else {
      window.alert('invalid input try again')
    }
  }
  return (
    <div>
      <br />
      {blog.url}
      <br />
      {blog.likes}{' '}
      <button onClick={likesUpdater} className="likeButton">
        like
      </button>
      <br />
      {addedBy}
      <br />
      {useID === id.id ? (
        <button className="deletion" onClick={removeItem}>
          delete
        </button>
      ) : null}
    </div>
  )
}
export default BlogInfo
