import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { AuthContext } from '../contexts/context'


function Router() {
    const { signed, loading } = useContext(AuthContext)
    if (loading) {
        return (
            <View style={{
                flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f4ff"
            }}>
                <ActivityIndicator  size={40} color="#000"/>
            </View>
        )
    }
    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Router;

