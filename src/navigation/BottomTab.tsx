import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import DashboardScreen from '../screens/DashboardScreen';
import WatchListScreen from '../screens/WatchListScreen';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator >
      <Tab.Screen 
        options={{ 
          headerShown: false, 
          tabBarLabelStyle: { display: 'none'},
          tabBarIcon: ({ focused }) => (
             <Icon name="home-outline" size={30} color={focused ? "#4F8EF7" : "#919191"} />
          )
        }} 
        name="Dashboard" 
        component={DashboardScreen} 
      />
      <Tab.Screen options={{ 
        headerShown: false, 
        tabBarLabelStyle: { display: 'none'},
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused, color, size }) => (
             <Icon name="list-outline" size={30} color={focused ? "#4F8EF7" : "#919191"} />
          )
        }}  
        name="Watch List" 
        component={WatchListScreen} 
      />
      <Tab.Screen options={{ 
        headerShown: false, 
        tabBarLabelStyle: { display: 'none'},
        tabBarIcon: ({ focused, color, size }) => (
             <Icon name="person-outline" size={30} color={focused ? "#4F8EF7" : "#919191"} />
          )
        }}   name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}