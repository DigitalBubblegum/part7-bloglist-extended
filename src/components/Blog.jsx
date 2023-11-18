import { useState } from 'react'
import Togglable from '../components/Togglable'
import BlogInfo from '../components/BlogInfo'
import blogService from '../services/blogs'
const Blog = ({ blog, useID }) => {
  console.log('wuwuwuwu',useID)
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const likesUpdater = async() => {
    blog.likes += 1
    const response = await blogService.update(blog,blog.id)
    console.log(response)
    console.log('click')
    setLikes(response.likes)
  }
  return(
    <div style={blogStyle} className = 'basicBlogView'>
      {/* {blog.title} <br/>{blog.author} <br/> {blog.user.name} <br/> {blog.user.id} */}
      {blog.title} <br/>{blog.author}<br/>
      <Togglable buttonLabel = 'view' className = 'togglableContent'>
        <BlogInfo className = 'advancedBlogView' blog= {blog} addedBy = {blog.user.name} id = {blog.user} useID = {useID} likesUpdater = {likesUpdater}/>
      </Togglable>
    </div>
  )
}
export default Blog