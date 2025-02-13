import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../appURL/AxiosInstance';
import { login } from '../../pages/mainPage/components/LogIn';

export const fetchPriority = createAsyncThunk('fetchPriority', async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user_info'));
    const userId = userData?.id;
    const response = await AxiosInstance.get(`/api/v1/priority/${userId}`);
    return response?.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail);
  }
});

export const createPriority = createAsyncThunk(
  'createPriority',
  async (priority, { dispatch }) => {
    try {
      const response = await AxiosInstance.post(`/api/v1/priority/`, priority);
      dispatch(fetchPriority());
      return { message: response.data.message };
    } catch (error) {
      throw new Error(error.response?.data?.deatil);
    }
  }
);

export const deletePriority = createAsyncThunk(
  'deletePriority',
  async (priorityID, { dispatch }) => {
    try {
      const response = await AxiosInstance.delete(
        `/api/v1/priority/${priorityID}`
      );
      dispatch(fetchPriority());
      return { message: response.data.message };
    } catch (error) {
      throw new Error(error.response?.data?.detail);
    }
  }
);

const PrioritySlice = createSlice({
  name: 'priorities',
  initialState: {
    priorities: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriority.pending, (state) => {
        state.status = 'loadingPriority';
      })
      .addCase(fetchPriority.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.priorities = action.payload;
      })
      .addCase(fetchPriority.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPriority.fulfilled, (state, action) => {
        state.priorities.push(action.payload);
      })
      .addCase(deletePriority.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(login.fulfilled, (state) => {
        if (state.status !== 'idle') {
          state.status = 'idle';
        }
      });
  },
});

export default PrioritySlice.reducer;
