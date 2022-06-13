import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import EmailConfirmation from "../screens/Welcome/EmailConfirmation";
import Welcome from "../screens/Welcome/Welcome";
import SignUpFinal from "../screens/Welcome/SignUpFinal";
import AccountRecoverStep1 from "../screens/Welcome/AccountRecover/AccountRecoverStep1";
import AccountRecoverStep2 from "../screens/Welcome/AccountRecover/AccountRecoverStep2";
import AccountRecoverStep3 from "../screens/Welcome/AccountRecover/AccountRecoverStep3";

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
            <Stack.Screen name='Account Recover Step 1' component={AccountRecoverStep1}/>
            <Stack.Screen name='Account Recover Step 2' component={AccountRecoverStep2}/>
            <Stack.Screen name='Account Recover Step 3' component={AccountRecoverStep3}/>
        </Stack.Navigator>
    )
}

export default WelcomeNavigation