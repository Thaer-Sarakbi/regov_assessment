import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import BottomTab from "./navigation/BottomTab"
import DetailsScreen from "./screens/DetailsScreen"
import SplashScreen from "./screens/SplashScreen"
import AuthStack from "./stacks/AuthStack"
import LoginScreen from "./screens/LoginScreen"
import { Movie } from "./types/types"

const Stack = createNativeStackNavigator<RootStackParamsList>()

export type RootStackParamsList = {
  Dashboard:{
    movies: Array<Movie>
  },
  SplashScreen: undefined,
  WatchListScreen: undefined,
  MovieDetails: {
    movieId: string
  },
  BottomTab: undefined
}

const AppStack = () => {
  return(
    <Stack.Navigator>
        {/* <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen
          name="Auth"
          component={LoginScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MovieDetails"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  )
}

export default AppStack