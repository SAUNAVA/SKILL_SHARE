import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";

const userToken = localStorage.getItem("userToken") || null;

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ formData, navigate }, thunkAPI) => {
        try {
            const res = await axios.post("/auth/login", formData)
            localStorage.setItem("userToken", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            navigate("/dashboard")
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Login Failed")
        }
    }
)

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ formData, navigate }, thunkAPI) => {
        try {
            const res = await axios.post("/auth/register", formData)
            // console.log(res.data)
            navigate("/login")
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Registration Failed")
        }
    }
)

export const fetchUserProfile = createAsyncThunk(
    "auth/fetchUserProfile",
    async (_, thunkAPI) => {
        try {
            const res = axios.get("/auth/profile")
            return res.data.user
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Failed to fetch user profile")
        }
    }

)

export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async (formData, thunkAPI) => {
        try {
            const { data } = await axios.put('/auth/profile', formData);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: userToken,
        loading: false,
        error: null,

    },
    reducers: {
        logout: (state) => {
            state.token = null,
                state.user = null,
                localStorage.removeItem("userToken")
                localStorage.removeItem("user")
        },
        loadUserFromStorage: (state) => {
            const token = localStorage.getItem("userToken")
            const user = localStorage.getItem("user")
            if (user) state.user = JSON.parse(user)
            if (token) state.token = token
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false,
                    state.user = action.payload.user,
                    state.token = action.payload.token
                // state.isAuthenticated = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.user = action.payload; // update Redux user
                localStorage.setItem("user", JSON.stringify(action.payload)); // Persist updated user in localStorage

            })
    }
})
export const { logout, loadUserFromStorage } = authSlice.actions
export default authSlice.reducer