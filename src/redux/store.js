import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import articleReducer from "./reducers/ArticleReducer";
import userReducer from "./reducers/UserReducer";
import followingReducer from './reducers/FollowingReducer'


const reducer = combineReducers({
    article: articleReducer,
    user: userReducer,
    following: followingReducer
})

export default createStore(
    reducer,
    applyMiddleware(thunk)
)