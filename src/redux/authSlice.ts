import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AccessTokenAuth } from '../api/keys';
import { API_URL } from '../api/apiUrls';
import axios from 'axios';

interface MyState {
  status: string,
  error: string | undefined
}

export const createRequestToken = createAsyncThunk("auth/createRequestToken", async () => {
    let request_token
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${AccessTokenAuth}`
        }
      };
    
    await fetch(API_URL.REQUEST_TOKEN, options)
    .then(response => response.json())
    .then(response => request_token = response.request_token)
    .catch(err => console.error(err));

    return request_token
})

  export const createSession = createAsyncThunk("auth/createSession", async (payload) => {
    const options = {
        method: 'POST',
        url: API_URL.CREATE_SESSION,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${AccessTokenAuth}`
        },
        body: JSON.stringify({
            username: 'Thaer',
            password: 'test123',
            request_token: payload.request_token.request_token
        })
      };
    
    // await fetch(API_URL.CREATE_SESSION, options)
    // .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(err => console.error(err));

    axios
  .request(options)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.error(error);
  });
})

// export default authSlice