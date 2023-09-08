import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AccessTokenAuth } from '../api/keys';
import { API_URL } from '../api/apiUrls';
import { Review } from '../types/types';

interface MyState {
  watchList: Array<Review>
  status: string,
  error: string | undefined
}

const userId = 20394161

  export const addToWatchList = createAsyncThunk("watchList/addToWatchList", async (movieId : string) => {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${AccessTokenAuth}`
        },
        body: JSON.stringify({media_type: 'movie', media_id: movieId, watchlist: true})
      };
    await fetch(`${API_URL.USER_DETAILS}/${userId}/watchlist`, options)
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch(err => console.error(err));
    })

    export const removeFromWatchList = createAsyncThunk("watchList/addToWatchList", async (movieId : string) => {
        const options = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${AccessTokenAuth}`
          },
          body: JSON.stringify({media_type: 'movie', media_id: movieId, watchlist: false})
        };
      await fetch(`${API_URL.USER_DETAILS}/${userId}/watchlist`, options)
      .then(response => response.json())
      .then(response => {
        if(response.success = true){
          getWatchList()
        }
      })
      .catch(err => console.error(err));
      })

      export const getWatchList = createAsyncThunk("watchList/getWatchList", async () => {
        let watchList: Array<Review> = []

        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${AccessTokenAuth}`
          }
        };
      await fetch(`${API_URL.USER_DETAILS}/${userId}/watchlist/movies`, options)
      .then(response => response.json())
      .then(response => watchList = response.results)
      .catch(err => console.error(err));

      return watchList
      })
  

const watchListSlice = createSlice({
  name: 'watchList',
  initialState: {
    watchList: [],
    status: '',
    error: ''
  } as MyState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
     
      .addCase(getWatchList.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getWatchList.fulfilled, (state, {payload}) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.watchList = payload
      })
      .addCase(getWatchList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default watchListSlice