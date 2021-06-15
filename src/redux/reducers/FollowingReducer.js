import userService from "../../services/user";

const initialState = null

const FollowingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_FOLLOWING_USERS":
            return action.data
        case "FOLLOW_USER":
            return [action.data, ...state]
        default:
            return state;
    }
}

export const getFollowing = (userId) => {
    return async dispatch => {
        const data = await userService.getFollowing(userId)
        dispatch({
            type: 'GET_FOLLOWING_USERS',
            data
        })
    }
}

export const followUser = (followedId) => {
    return async dispatch => {
        const data = await userService.followUser(followedId)
        dispatch({
            type: 'FOLLOW_USER',
            data
        })
    }
}


export default FollowingReducer