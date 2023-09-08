import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { movieDetails } from '../redux/movieSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { palette } from '../assets/palette';
import AnimatedLottieView from 'lottie-react-native';
import { addToWatchList, getWatchList, removeFromWatchList } from '../redux/watchListSlice';
import { addRating, getReviews } from '../redux/reviewsSlice';
import ReadMore from 'react-native-read-more-text';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { AppDispatch } from '../redux/store';
import { Movie, Review } from '../types/types';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamsList } from '../AppStack';
import { NavigationScreenProp } from 'react-navigation';

interface MyState {
  movies: {
    movie: Movie, 
    status: string, 
    error: string,
    backdrop_path: string
  },
  watchList: {
    watchList: Array<Movie>
  },
  reviews: {
    reviewsList: Array<Review>
  }
}

interface Props {
  route: RouteProp<RootStackParamsList, "MovieDetails">
  navigation: NavigationScreenProp<RootStackParamsList, "MovieDetails">
}

function DetailsScreen({ route, navigation } : Props): JSX.Element {

  const dispatch = useDispatch<AppDispatch>()

  const [rating, setRating] = useState<number>()

  const movie = useSelector((state: MyState) => state.movies.movie)
  const status = useSelector((state: MyState) => state.movies.status)
  const error = useSelector((state: MyState) => state.movies.error)
  const watchList = useSelector((state: MyState) => state.watchList.watchList)
  const reviews = useSelector((state: MyState) => state.reviews.reviewsList)

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    dispatch(movieDetails(route.params.movieId))
    dispatch(getWatchList())
    dispatch(getReviews(route.params.movieId))

    if(watchList){
      watchList.find((movie: Movie) => {
        if(movie.id === route.params.movieId){
          setLiked(true)
        }
      })
    }
  },[])

  const onLikeChange = () => {
    setLiked((isLiked) => !isLiked)
    
    if(liked){
      dispatch(removeFromWatchList(route.params.movieId))
    } else {
      dispatch(addToWatchList(route.params.movieId))
    }
  }

  const renderTruncatedFooter = (handlePress : () => void) => {
    return (
      <Text style={{marginTop: 5}} onPress={handlePress}>
        Read more
      </Text>
    );
  }
 
  const renderRevealedFooter = (handlePress : () => void) => {
    return (
      <Text style={{ marginTop: 5}} onPress={handlePress}>
        Show less
      </Text>
    );
  }

  const doAddReview = (rate : number | undefined) => {
    dispatch(addRating({rate, movieId: route.params.movieId}))
  }

  const ratingCompleted = (rating : number) => {
    setRating(rating)
  }

  if(status === 'loading'){
    return(
      <View style={{ flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
        <AnimatedLottieView source={require('../assets/loading.json')} autoPlay loop/>
      </View>
    )
  }else if(status === 'succeeded'){
    return(
      <ScrollView>
        <View style ={styles.goBack}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left-bold-circle-outline" size={25} color={'white'} />
          </TouchableOpacity>
        </View>

        <View style={styles.like}>
        <TouchableOpacity onPress={() => onLikeChange()}>
            <MaterialCommunityIcons
              name={liked ? "heart" : "heart-outline"}
              size={30}
              color={liked ? "red" : "white"}
            />
          </TouchableOpacity>
        </View>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}` }} resizeMode='cover' style={{ width: '100%', height: 200 }} />
  
        <View style = {{ paddingHorizontal: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: palette.colors.titles, marginVertical: 10 }}>{movie.title}</Text>
          <Text>{movie.overview}</Text>
          <Text style={{ marginVertical: 10, color: palette.colors.titles }}>Release Date: {movie.release_date}</Text>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'black', marginTop: 20 }}>Reviews</Text>
        {/* <TextInput
          style={{ borderWidth: 1, borderColor: 'black', borderRadius: 20 }}
          numberOfLines={5}
          multiline={true}
          textAlignVertical='top'
        /> */}

<Rating
  type='heart'
  ratingCount={6}
  imageSize={50}
  showRating
  onFinishRating={ratingCompleted}
/>

        <TouchableOpacity onPress={() => doAddReview(rating)} style={{ width: '100%', height: 50, backgroundColor: 'blue', borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Add Review</Text>
        </TouchableOpacity>

        {
              reviews?.map(review => {
                  return(
                    <View key={review.id} style={{ paddingHorizontal: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                        <Image style={{ width: 65, height: 65, borderRadius: 50 }} source={{ uri: `https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}` }} />
                        <View>
                          <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>{review.author}</Text>
                        </View>
                      </View>
                      <AirbnbRating
                      ratingContainerStyle={{ height: 10, top: -20, left: -10 }}
                            defaultRating={review.author_details.rating}
                            size={20}
                          />
                      <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={renderTruncatedFooter}
              renderRevealedFooter={renderRevealedFooter}
              // onReady={this._handleTextReady}
              >
              <Text>{review.content}</Text>
            </ReadMore>
                      
                    </View>
                  )
              })
        }
        </View>
      </ScrollView>
    )
  }else if(status === 'failed'){
    return(
      <View>
        <Text>{error}</Text>
      </View>
    )
} else {
  return(
    <View>
      <Text>Not Found</Text>
    </View>
  )
}
}

const styles = StyleSheet.create({
  goBack:{ 
    position: 'absolute', 
    top: 10, 
    left: 10, 
    zIndex: 1
  },
  like:{
    position: 'absolute', 
    top: 10, 
    right: 10, 
    zIndex: 1
  }
});

export default DetailsScreen;