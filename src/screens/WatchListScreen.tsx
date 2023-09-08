import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, ImageBackground, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { getWatchList } from '../redux/watchListSlice';
import AnimatedLottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../AppStack';
import { Movie } from '../types/types';
import { AppDispatch } from '../redux/store';

interface MyState {
  watchList: {
    watchList: Array<Movie>, 
    status: string, 
    error: string
  }
}

function WatchListScreen({ navigation } : NativeStackScreenProps<RootStackParamsList, 'WatchListScreen'>): JSX.Element {

  const dispatch = useDispatch<AppDispatch>()

  const watchList = useSelector((state: MyState) => state.watchList.watchList)
  const status = useSelector((state: MyState) => state.watchList.status)
  const error = useSelector((state: MyState) => state.watchList.error)

  const isFocused = useIsFocused();

  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    dispatch(getWatchList())
  },[isFocused])

  const onRefresh = () => {
    setIsFetching(true)
    dispatch(getWatchList())
    setIsFetching(false)
  }

  const renderItem = ({item} : {item: Movie}) => {
    return(
      <TouchableOpacity style={styles.bubble} onPress={() => navigation.navigate('MovieDetails', {
        movieId: item.id
      })}>

          <View style={{ height: '100%', flex: 1}}>
            <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/w500/${item?.poster_path}` }} resizeMode= "contain" style = {{  flex: 1, justifyContent: 'center', height: '100%' }}>
            </ImageBackground>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black', marginBottom: 10 }}>{item.title}</Text>
            <Text numberOfLines={5} style={{ marginBottom: 10 }}>{item.overview}</Text>
            <Text>average: {item.vote_average}</Text>
            <Text>counts: {item.vote_count}</Text>
          </View>
      </TouchableOpacity>
    )
  }

  if(status === 'loading'){
    return(
      <View style={[styles.container, styles.horizontal]}> 
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  } else if(status === 'succeeded'){
    return(
    <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 10 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'black' }}>Watch List</Text>

    <FlatList
      // keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      data={watchList}
      renderItem={renderItem}
      onRefresh= {() => onRefresh()}
      refreshing={isFetching}
    />
  </View>
    )
  } else if(status === 'failed'){
    return(
      <View>
        <Text>{error}</Text>
      </View>
    )
} else {
  return (
    <Text>Not Found</Text>
  )
}
}

const styles = StyleSheet.create({
  bubble: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 5,
    width: '100%',
    height: 240,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})

export default WatchListScreen;