import userService from "../../services/user";

const initialState = null

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LOGIN_USER":
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

export const getLoginUser = () => {
    return async dispatch => {
        const data = await userService.getLoginUser()
        dispatch({
            type: 'GET_LOGIN_USER',
            data
        })
    }
}


export default UserReducer