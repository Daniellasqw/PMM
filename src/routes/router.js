import React,{useContext} from 'react';
import {View,ActivityIndicator} from 'react-native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {AuthContext} from '../contexts/context'


function Router(){
    const {signed} = useContext(AuthContext)
    const loading = false;
    return(
signed ? <AppRoutes/>:<AuthRoutes/>
    )
}

export default Router;

