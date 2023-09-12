import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';


const AuthStack = createNativeStackNavigator();


function AuthRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown:false
                }}
            />

            <AuthStack.Screen
                name='Register'
                component={Register}
                options={{
                    headerStyle:{
                        backgroundColor:"#3b3dbf",
                        borderBottomwidth:1,
                        borderBottomColor:"#00b94a"
                    },
                    headerTintColor:'#fff',
                    headerTitle:'Voltar',
                    headerBackTitleVisible:false //ios
                }}
            />


        </AuthStack.Navigator>
    )
}
export default AuthRoutes;