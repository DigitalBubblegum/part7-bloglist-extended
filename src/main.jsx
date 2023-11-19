import ReactDOM from 'react-dom/client'
import '../index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import App from './App'
import store from './reducers/store'

console.log(store.getState())
ReactDOM.createRoot(document.getElementById('root')).render(<Provider store={store}>
  <App />
</Provider>)
