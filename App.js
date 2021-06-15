import React from "react";
import {Provider} from "react-redux";
import store from "./src/redux/store";
import Index from "./src/navigations/Index";

const App = () => {
    return (
        <Provider store={store}>
            <Index/>
        </Provider>
    )
}

export default App