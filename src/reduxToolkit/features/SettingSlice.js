import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../appURL/AxiosInstance';
import { login } from '../../pages/mainPage/components/LogIn';

export const fetchUserProfile = createAsyncThunk(
  'fetchUserProfile',
  async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user_info'));
      const userId = userData?.id;
      const response = await AxiosInstance.get(
        `/api/v1/user/current_user?user_id=${userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'updateUser',
  async ({ id, updatedUserProfile }, { dispatch }) => {
    try {
      const response = await AxiosInstance.put(
        `/api/v1/user/users/${id}`,
        updatedUserProfile
      );
      dispatch(fetchUserProfile());
      return { id, updatedUserProfile: response.data };
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);
export const clearUserProfile = createAsyncThunk(
  'clearUserDetails',
  async () => {
    return null;
  }
);

const SettingSlice = createSlice({
  name: 'setting',
  initialState: {
    userInfo: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload.updatedUserProfile;
      })
      .addCase(clearUserProfile.fulfilled, (state) => {
        state.userInfo = {};
      })
      .addCase(login.fulfilled, (state) => {
        if (state.status !== 'idle') {
          state.status = 'idle';
        }
      });
  },
});

export default SettingSlice.reducer;

// const SettingSlice = createSlice({
//   name: "setting",
//   initialState: {
//     userInfo: {},
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.status = "loadingUsers";
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.userInfo = action.payload;
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         const { id, updatedUserProfile } = action.payload;
//         const index = state.userInfo.findIndex((setting) => setting.id === id);
//         if (index !== -1) {
//           state.userInfo[index] = updatedUserProfile;
//         }
//       })
//       .addCase(clearUserProfile.fulfilled, (state, action) => {
//         state.userInfo = action.payload;
//       })
//       .addCase(login.fulfilled, (state) => {
//         if (state.status !== "idle") {
//           state.status = "idle";
//         }
//       });
//   },
// });

// export default SettingSlice.reducer;
