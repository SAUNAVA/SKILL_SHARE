import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";


export const fetchSessionRequests = createAsyncThunk(
  'mentorSessions/fetchSessionsRequests',
  async (__, thunkAPI) => {
    try {
      const res = await axiosInstance.get('/sessions/mentor-requests')
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const respondToSession = createAsyncThunk(
  'mentorSessions/acceptSessionRequest',
  async ({ sessionId, actionType }, thunkAPI) => {
    try {
      const res = await axiosInstance.patch(`/sessions/${sessionId}/respond`, { actionType })
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const fetchAvailability = createAsyncThunk(
  'mentorSessions/fetchAvailability',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/users/availability')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const updateAvailability = createAsyncThunk(
  'mentorSessions/updateAvailability',
  async (availability, thunkAPI) => {
    try {
      const response = await axiosInstance.put('/users/availability', { availability })
      return response.data.availability
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

const mentorSessionSlice = createSlice({
  name: 'mentorSessions',
  initialState: {
    requests: [],
    availability: [],
    loading: false,
    error: null,
  },
  reducers: {
    addSlot: (state, action) => {
      state.availability.push(action.payload)
    },
    removeSlot: (state, action) => {
      state.availability = state.availability.filter((slot, index) => index !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessionRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSessionRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchSessionRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(respondToSession.fulfilled, (state, action) => {
        // Update the status of the responded session
        const updated = state.requests.map((r) =>
          r._id === action.payload._id ? action.payload : r
        );
        state.requests = updated;
      })
      .addCase(fetchAvailability.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availability = action.payload;
      })
      .addCase(fetchAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAvailability.fulfilled, (state, action) => {
        state.availability = action.payload;
      });
  },
});


export const { addSlot, removeSlot, clearMentorError } = mentorSessionSlice.actions;
export default mentorSessionSlice.reducer;