import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AccessTokenAuth } from '../api/keys';
import { API_URL } from '../api/apiUrls';
import { Movie } from '../types/types';

interface MyState {
  reviewsList: Array<Movie>
  status: string,
  error: string | undefined
}

      export const getReviews = createAsyncThunk("reviewsList/getReviews", async (movieId : string) => {
        let reviewsList : Array<Movie> = []

        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${AccessTokenAuth}`
          }
        };

      await fetch(`${API_URL.DETAILS}/${movieId}/reviews`, options)
      .then(response => response.json())
      .then(response => reviewsList = response.results)
      .catch(err => console.error(err));

      return reviewsList
      })

      export const addRating = createAsyncThunk("reviewsList/addRating", async (payload : { rate: number | undefined, movieId: string }) => {

        const options = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${AccessTokenAuth}`
          },
          body: `{"value": ${payload.rate}}`
        };

      await fetch(`${API_URL.DETAILS}/${payload.movieId}/rating`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
      })
  

const reviewsSlice = createSlice({
  name: 'reviewsList',
  initialState: {
    reviewsList: [],
    status: '',
    error: ''
  } as MyState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
     
      .addCase(getReviews.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getReviews.fulfilled, (state, {payload}) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.reviewsList = payload
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default reviewsSlice