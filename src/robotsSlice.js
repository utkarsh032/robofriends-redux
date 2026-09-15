import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { apiCall, ROBOTS_URL } from './api/api'

const initialState = {
  robots: [],
  searchField: '',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

export const fetchRobots = createAsyncThunk('robots/fetch', () => apiCall(ROBOTS_URL), {
  // Skip duplicate requests, e.g. from React StrictMode running effects twice.
  condition: (_, { getState }) => getState().robots.status !== 'loading',
})

const robotsSlice = createSlice({
  name: 'robots',
  initialState,
  reducers: {
    setSearchField(state, action) {
      state.searchField = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRobots.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchRobots.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.robots = action.payload
      })
      .addCase(fetchRobots.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setSearchField } = robotsSlice.actions

export const selectFilteredRobots = createSelector(
  [(state) => state.robots.robots, (state) => state.robots.searchField],
  (robots, searchField) => {
    const query = searchField.trim().toLowerCase()
    return robots.filter((robot) => robot.name.toLowerCase().includes(query))
  },
)

export default robotsSlice.reducer
