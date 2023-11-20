import { useDispatch } from 'react-redux'
import { increaseBlogLikes } from '../reducers/blogReducer'
const Blog = ({ blog, useID }) => {
  // console.log('wuwuwuwu', blog)
  const dispatch = useDispatch()
  const adb = blog.user.name
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const likesUpdater = () => {
    // console.log(typeof blog.likes)
    const changedBlogLikes = {
      ...blog,
      likes: blog.likes + 1
    }
    // console.log('click',changedBlogLikes)
    dispatch(increaseBlogLikes(changedBlogLikes,blog.id))
  }
  return (
    <div style={blogStyle} className="basicBlogView">
      {/* {blog.title} <br/>{blog.author} <br/> {blog.user.name} <br/> {blog.user.id} */}
      {blog.title} by {blog.author}
    </div>
  )
}
export default Blog
