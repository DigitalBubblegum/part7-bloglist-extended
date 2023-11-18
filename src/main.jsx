import ReactDOM from 'react-dom/client'
import '../index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import App from './App'

const store = configureStore({
  reducer:{
    notification: notificationReducer
  }
})

console.log(store.getState())
ReactDOM.createRoot(document.getElementById('root')).render(<Provider store={store}>
  <App />
</Provider>)
