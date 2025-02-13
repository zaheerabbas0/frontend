import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../appURL/AxiosInstance';
import { login } from '../../pages/mainPage/components/LogIn';

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user_info'));
    const userId = userData?.id;
    const response = await AxiosInstance.get(
      `/api/v1/user/users/creator/${userId}`
    );
    const filteredUsers = response.data.filter(
      (user) => user.role_id === 'User'
    );

    return filteredUsers;
    // return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || error.message);
  }
});

export const createUser = createAsyncThunk(
  'createUser',
  async (user, { dispatch }) => {
    try {
      const response = await AxiosInstance.post(`/api/v1/user/users`, user);
      dispatch(fetchUsers());
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.detail;
      throw new Error(errorMessage);
    }
  }
);

export const updateUser = createAsyncThunk(
  'updateUser',
  async ({ id, updatedUser }, { dispatch }) => {
    try {
      if (updatedUser.hasOwnProperty('created_by_id')) {
        delete updatedUser.created_by_id;
      }
      const response = await AxiosInstance.put(
        `/api/v1/user/users/${id}`,
        updatedUser
      );
      dispatch(fetchUsers());
      return { id, updatedUser: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.detail;
      throw new Error(errorMessage);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'deleteUser',
  async (ids, { dispatch }) => {
    try {
      const idsArray = Array.isArray(ids) ? ids : [ids];
      await AxiosInstance.delete(`/api/v1/user/users`, {
        data: idsArray,
      });
      dispatch(fetchUsers());
      return idsArray;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  'fetchUserDetails',
  async (id) => {
    try {
      const response = await AxiosInstance.get(
        `/api/v1/user/get-tickets-by-user/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

// export const clearUserDetails = createAsyncThunk(
//   'clearUserDetails',
//   async () => {
//     return null;
//   }
// );

const initialState = {
  users: [],
  userDetails: [],
  status: 'idle',
  error: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loadingUsers';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { id, updatedUser } = action.payload;
        const index = state.users.findIndex((user) => user.id === id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedIds = action.payload;
        state.users = state.users.filter(
          (user) => !deletedIds.includes(user.id)
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loadingUserDetails';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const tickets = action.payload.filter(
          (ticket) => !ticket.template_name
        );
        state.userDetails = tickets;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // .addCase(clearUserDetails.fulfilled, (state, action) => {
      //   state.userDetails = action.payload;
      // })
      .addCase(login.pending, () => {
        return initialState;
      });
    // .addCase(login.fulfilled, (state) => {
    //   if (state.status !== 'idle') {
    //     state.status = 'idle';
    //   }
    // });
  },
});

export default UserSlice.reducer;
