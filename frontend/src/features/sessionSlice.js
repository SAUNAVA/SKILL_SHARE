import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";


export const fetchSessions = createAsyncThunk(
    'session/fetchSessions',
    async(_, thunkAPI)=>{
        try {
            const res = await axiosInstance.get('/users/sessions/my-sessions')
            console.log(res.data)
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to fetch your sessions due to some error')
        }
    }
)



const sessionSlice = createSlice({
    name: "session",
    initialState: {
        sessions: [],
        loading: false,
        error: null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchSessions.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(fetchSessions.fulfilled,(state,action)=>{
            state.loading = false
            state.sessions = action.payload
        })
        .addCase(fetchSessions.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export default sessionSlice.reducer