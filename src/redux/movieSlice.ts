import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AccessTokenAuth } from '../api/keys';
import { API_URL } from '../api/apiUrls';
import { Movie } from '../types/types';

interface MyState {
  data: Array<Movie>,
  movie: Movie | string | undefined,
  status: string,
  error: string | undefined
}

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AccessTokenAuth}`
    }
  };

export const getMovies = createAsyncThunk("movies/getMovies", async () => {
let moviesList: Array<Movie> = []

await fetch(`${API_URL.TRENDING}?language=en-US`, options)
.then(response => response.json())
.then(response => {
  moviesList = response.results
})
.catch(err => console.error(err));

  return moviesList
})

export const searchMovie = createAsyncThunk("movies/searchMovie", async (name: string) => {
  let moviesList: Array<Movie> = []
  
  await fetch(`${API_URL.SEARCH}?query=${name}`, options)
  .then(response => response.json())
  .then(response => {
    moviesList = response.results
  })
  .catch(err => console.error(err));
  
    return moviesList
  })

  export const movieDetails = createAsyncThunk("movies/movieDetails", async (id: string) => {
    let movie: Movie | undefined
    
    await fetch(`${API_URL.DETAILS}/${id}`, options)
    .then(response => response.json())
    .then(response => {
      movie = response
    })
    .catch(err => console.error(err));
    
      return movie
    })
  

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    data: [],
    movie: '',
    status: '',
    error: ''
  } as MyState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getMovies.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.data = payload
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      builder
      .addCase(searchMovie.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(searchMovie.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.data = payload
      })
      .addCase(searchMovie.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(movieDetails.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(movieDetails.fulfilled, (state, {payload}) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.movie = payload
      })
      .addCase(movieDetails.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default movieSlice