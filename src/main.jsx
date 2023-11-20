import ReactDOM from 'react-dom/client'
import '../index.css'
import { Provider } from 'react-redux'
import App from './App'
import store from './reducers/store'
import {
  BrowserRouter as Router
} from 'react-router-dom'
// console.log(store.getState())
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
