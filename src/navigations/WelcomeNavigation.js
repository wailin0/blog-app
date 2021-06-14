import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import EmailConfirmation from "../screens/Welcome/EmailConfirmation";
import Welcome from "../screens/Welcome/Welcome";
import SignUpFinal from "../screens/Welcome/SignUpFinal";

const Stack = createStackNavigator()

const WelcomeNavigation = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='Welcome'
        >
            <Stack.Screen name='Welcome' component={Welcome}/>
            <Stack.Screen name='Email Confirmation' component={EmailConfirmation}/>
            <Stack.Screen name='SignUp Final' component={SignUpFinal}/>
        </Stack.Navigator>
    )
}

export default WelcomeNavigation