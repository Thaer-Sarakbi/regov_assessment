import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, ImageBackground, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { getMovies, searchMovie } from '../redux/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import AnimatedLottieView from 'lottie-react-native';
import { AppDispatch } from '../redux/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../AppStack';
import { Movie } from '../types/types'

interface MyState {
  movies: {data: Array<Movie>}
}

function DashboardScreen({ navigation } : NativeStackScreenProps<RootStackParamsList, 'Dashboard'>): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const movies = useSelector((state: MyState) => state.movies.data)
 
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    dispatch(getMovies())
  },[])  

  const onRefresh = () => {
    setIsFetching(true)
    dispatch(getMovies())
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
        {/* </View> */}
      </TouchableOpacity>
    )
  }

  if(movies.length === 0){
    return(
      <View style={[styles.container, styles.horizontal]}> 
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  } else {
    return(
      <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'black' }}>TRENDING</Text>
        <TextInput
        onChangeText={
          (text) => {
            if(text !== ''){
              dispatch(searchMovie(text))
            }
           
            if(text === ''){
              dispatch(getMovies())
            }
        }}
          placeholder= 'Search'
          style={{ borderWidth: 1, borderColor: 'black', marginVertical: 10, borderRadius: 50, paddingHorizontal: 20 }}
        />
        <FlatList
          // keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          data={movies}
          renderItem={renderItem}
          onRefresh= {() => onRefresh()}
          refreshing={isFetching}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bubble: {
    flexDirection: 'row',
    // alignSelf: 'flex-start',
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
export default DashboardScreen;