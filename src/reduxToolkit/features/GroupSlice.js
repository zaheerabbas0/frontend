import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../appURL/AxiosInstance';
import { login } from '../../pages/mainPage/components/LogIn';

export const fetchGroup = createAsyncThunk('fetchGroup', async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user_info'));
    const userId = userData?.id;
    const response = await AxiosInstance.get(`/api/v1/groups/${userId}`);
    return response?.data?.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail);
  }
});

export const createGroup = createAsyncThunk(
  'createGroup',
  async (group, { dispatch }) => {
    try {
      const response = await AxiosInstance.post(`/api/v1/groups/`, group);
      dispatch(fetchGroup());
      return { message: response.data.message };
    } catch (error) {
      throw new Error(error.response?.data?.detail);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  'deleteGroup',
  async (groupID, { dispatch }) => {
    try {
      const response = await AxiosInstance.delete(`/api/v1/groups/${groupID}`);
      dispatch(fetchGroup());
      return { message: response.data.message };
    } catch (error) {
      throw new Error(error.response?.data?.detail);
    }
  }
);

const GroupSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroup.pending, (state) => {
        state.status = 'loadingGroup';
      })
      .addCase(fetchGroup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groups = action.payload;
      })
      .addCase(fetchGroup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(login.fulfilled, (state) => {
        if (state.status !== 'idle') {
          state.status = 'idle';
        }
      });
  },
});

export default GroupSlice.reducer;
