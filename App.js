import React from "react";
import {Provider} from "react-redux";
import store from "./src/redux/store";
import Index from "./src/navigations/Index";
import firebase from "firebase/app";
import firebaseConfig from "./src/config/firebaseConfig";

const App = () => {
    return (
        <Provider store={store}>
            <Index/>
        </Provider>
    )
}

firebase.initializeApp(firebaseConfig);

export default App