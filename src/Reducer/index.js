import {createStore , combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import Login from "./login.js";
import postRD from "./post.js"

const reducers = combineReducers({ Login, postRD });
const store = ()=>{
    return createStore(reducers , composeWithDevTools())
}
export default store()