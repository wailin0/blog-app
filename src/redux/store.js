import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import articleReducer from "./reducers/ArticleReducer";
import userReducer from "./reducers/UserReducer";


const reducer = combineReducers({
    article: articleReducer,
    user: userReducer,
})

export default createStore(
    reducer,
    applyMiddleware(thunk)
)