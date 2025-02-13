import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../appURL/AxiosInstance';
import { login } from '../../pages/mainPage/components/LogIn';

export const fetchChatUsers = createAsyncThunk('fetchChatUsers', async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user_info'));
    const userId = userData?.id;
    const response = await AxiosInstance.get(
      `/api/v1/user/users-get-demo/creator/${userId}`
    );

    return response?.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
});

export const createGroup = createAsyncThunk(
  'createGroup',
  async (groupName, { dispatch }) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user_info'));
      const userId = userData?.id;
      const response = await AxiosInstance.post('/api/v1/chat/createGroup', {
        created_by_id: userId,
        group_name: groupName,
      });
      dispatch(fetchChatUsers());
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail);
    }
  }
);

export const addUsersToGroup = createAsyncThunk(
  'addUsersToGroup',
  async (group, { dispatch }) => {
    try {
      const response = await AxiosInstance.post(
        '/api/v1/chat/add_user-to-group',
        {
          ...group,
        }
      );
      dispatch(fetchChatUsers());
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail);
    }
  }
);
export const removeUsersFromGroup = createAsyncThunk(
  'removeUsersFromGroup',
  async (group, { dispatch }) => {
    try {
      const response = await AxiosInstance.delete(
        '/api/v1/chat/remove-user-from-group',
        {
          data: group,
        }
      );
      dispatch(fetchChatUsers());
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail);
    }
  }
);

const ChatSlice = createSlice({
  name: 'chatUser',
  initialState: {
    chatUsers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatUsers.pending, (state) => {
        state.status = 'loadingUsers';
      })
      .addCase(fetchChatUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chatUsers = action.payload;
      })
      .addCase(fetchChatUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addUsersToGroup.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state) => {
        if (state.status !== 'idle') {
          state.status = 'idle';
        }
      });
  },
});

export default ChatSlice.reducer;
