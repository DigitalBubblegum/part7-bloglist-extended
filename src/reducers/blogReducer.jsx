import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
const initialState = []
const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers:{
    addNewBlog(state,action){
      console.log('state now before adding a new blog',state)
      console.log('action',action)
      const content = action.payload
      console.log('content is ',JSON.parse(JSON.stringify(content)))
      state.push(content)
    },
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlogLikes(state,action) {
      console.log('state now in vote: ', state)
      console.log('action', action)
      console.log('blog id is, ', action.payload.id)
      return state.map((n) =>
        n.id !== action.payload.id ? n : action.payload
      )
    },
  }
})
export const { addNewBlog,setBlogs,appendBlog,updateBlogLikes } = blogSlice.actions
export const initializeBlogs = () => {
  return async dispatch => {
    // console.log('inside initialize blogs')
    const blogs = await blogService.getAll()
    // console.log(blogs)
    dispatch(setBlogs(blogs))
  }
}
export const createNewBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}
export const increaseBlogLikes = (id,changedBlogLikes) => {
  return async dispatch => {
    console.log('blog',changedBlogLikes)
    const updatedBlogLikes = await blogService.update(id,changedBlogLikes)
    dispatch(updateBlogLikes(updatedBlogLikes))
  }
}
export const deleteBlog = (id) => {
  return async dispatch => {
    console.log('deleting the blog')
    const blogdel = await blogService.remove(id)
    console.log(blogdel)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export default blogSlice.reducer