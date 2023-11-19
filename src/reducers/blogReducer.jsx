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
    }
  }
})
export const { addNewBlog,setBlogs,appendBlog } = blogSlice.actions
export const initializeBlogs = () => {
  return async dispatch => {
    console.log('inside initialize blogs')
    const blogs = await blogService.getAll()
    console.log(blogs)
    dispatch(setBlogs(blogs))
  }
}
export const createNewBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}
export default blogSlice.reducer