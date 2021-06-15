import userService from "../../services/user";

const initialState = null

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOGIN_USER":
            return action.data
        case "UPDATE_USER":
            return action.data
        default:
            return state;
    }
}

export const updateUser = (updatedUser) => {
    return async dispatch => {
        const data = await userService.updateUser(updatedUser)
        dispatch({
            type: 'UPDATE_USER',
            data
        })
    }
}

export const setLoginUser = (data) => {
    return async dispatch => {
        dispatch({
            type: 'SET_LOGIN_USER',
            data
        })
    }
}


export default UserReducer