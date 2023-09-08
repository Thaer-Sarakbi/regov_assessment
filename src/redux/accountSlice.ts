import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AccessTokenAuth } from '../api/keys';
import { API_URL } from '../api/apiUrls';

interface MyState {
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

  export const userDetails = createAsyncThunk("user/userDetails", async (userId: string) => {
      let user
    
    await fetch(`${API_URL.USER_DETAILS}/${userId}`, options)
    .then(response => response.json())
    .then(response => { user = response })
    .catch(err => console.error(err));
    
      return user
    })
  

const movieSlice = createSlice({
  name: 'user',
  initialState: {
    user: '',
    status: '',
    error: ''
  } as MyState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
     
      .addCase(userDetails.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(userDetails.fulfilled, (state, {payload}) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.user = payload
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default movieSlice