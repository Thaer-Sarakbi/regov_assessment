import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccessTokenAuth } from '../api/keys';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../AppStack';

function SplashScreen({ navigation } : StackScreenProps<RootStackParamsList, 'SplashScreen'>): JSX.Element {
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setAnimating(false);
        }, 5000);
      }, []);
      
  return(
    <View style={styles.container}>
        <ActivityIndicator
          animating={animating}
          color="#FFFFFF"
          size="large"
          style={styles.activityIndicator}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#307ecc',
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
  });

export default SplashScreen;