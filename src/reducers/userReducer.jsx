import loginService from '../services/login'
import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'
const initialState = null
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    setUser(state,action){
      // console.log('setting user',action.payload)
      return action.payload
    }
  }
})
export const { setUser } = userSlice.actions
export const userLogin = (signInInfo) => {
  return async dispatch => {
    // console.log('inside the userLogin reducer')
    const user = await loginService.login(signInInfo)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))

  }
}
export default userSlice.reducer