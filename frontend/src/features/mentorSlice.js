import { createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";


export const fetchSessionRequests = createAsyncThunk(
    'mentorSessions/fetchSessionsRequests',
    async(__, thunkAPI)=>{
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
    async({sessionId, actionType}, thunkAPI)=>{
        try {
            const res = await axiosInstance.patch(`/sessions/${sessionId}/respond` , {actionType})
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

const mentorSessionSlice = createSlice({
    name: 'mentorSessions',
    initialState: {
      requests: [],
      loading: false,
      error: null,
    },
    reducers: {},
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
        });
    },
  });
  
  export default mentorSessionSlice.reducer;