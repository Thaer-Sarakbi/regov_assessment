import { configureStore } from '@reduxjs/toolkit'
import movieSlice from './movieSlice'
import accountSlice from './accountSlice'
import watchListSlice from './watchListSlice'
import reviewsSlice from './reviewsSlice'

export const store = configureStore({ reducer: {
    movies: movieSlice.reducer,
    account: accountSlice.reducer,
    watchList: watchListSlice.reducer,
    reviews: reviewsSlice.reducer
} })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch