import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Home/Home';
import New from '../screens/New/New';
import Profile from '../screens/Profile/Profile';
import CustomDrawer from '../screens/components/CustomDrawer';
const AppDrawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <AppDrawer.Navigator
      drawerContent={(props)=><CustomDrawer {...props}/>}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#fff",
          paddingTop: 20
        },
        drawerActiveBackgroundColor: "#3b3dbf",
        drawerActiveTintColor: "#fff",
        drawerInactiveBackgroundColor: "#f0f2ff",
        drawerInactiveTintColor: "#121212"

      }}
    >
      <AppDrawer.Screen
        name="Home"
        component={Home}
      />
      <AppDrawer.Screen
        name="Registrar"
        component={New}
      />

      <AppDrawer.Screen
        name="Perfil"
        component={Profile}
      />




    </AppDrawer.Navigator>
  )
}