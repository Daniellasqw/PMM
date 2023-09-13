import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Home/Home';

const AppDrawer  = createDrawerNavigator();

 export default function AppRoutes(){
    return(
        <AppDrawer.Navigator>
            <AppDrawer.Screen
            name="Home"
            component={Home}
            />

            
        </AppDrawer.Navigator>
    )
}