import { configureStore } from '@reduxjs/toolkit'
import robotsReducer from './robotsSlice'

export const setupStore = (preloadedState) =>
  configureStore({
    reducer: { robots: robotsReducer },
    preloadedState,
  })
