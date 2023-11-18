import { createSlice } from '@reduxjs/toolkit'
const initialState = 'this is a test notification'
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers:{
    changeNoti(state,action){
      console.log('state now in notification: ', state)
      console.log('action', action.payload)
      return action.payload
    },
    resetNoti(state){
      console.log('resetting notification')
      console.log(state)
      return null
    }
  }
})
export const { changeNoti,resetNoti } = notificationSlice.actions
export const setNotification = (content,timeInSec) => {
  return async dispatch => {
    console.log('hitting up notification',content)
    const timeInMSec = timeInSec * 1000
    console.log(timeInMSec)
    dispatch(changeNoti(content))
    setTimeout(() => {
      dispatch(resetNoti())
    }, timeInMSec)
  }
}
export default notificationSlice.reducer