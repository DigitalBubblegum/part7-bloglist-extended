import usersService from '../services/users'
import { createSlice } from '@reduxjs/toolkit'
const initialState = ['nino']
const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers:{
    userList(state,action){
      return action.payload
    }
  }
})
export const { userList } = userListSlice.actions
export const fetchUsers = () => {
  return async dispatch => {
    // console.log('inside fetchUsers')
    const users = await usersService.getAll()
    dispatch(userList(users))
  }
}
export default userListSlice.reducer