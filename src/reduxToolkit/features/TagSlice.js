import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../appURL/AxiosInstance';
import { login } from '../../pages/mainPage/components/LogIn';

export const fetchTags = createAsyncThunk('fetchTags', async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user_info'));
    const userId = userData?.id;
    const response = await AxiosInstance.get(`/api/v1/tags/${userId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || error.message);
  }
});

export const addTags = createAsyncThunk(
  'addTags',
  async (tag, { dispatch }) => {
    try {
      const response = await AxiosInstance.post('/api/v1/tags', tag);
      dispatch(fetchTags());
      return { message: response.data.message };
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const deleteTag = createAsyncThunk(
  'deleteTag',
  async (tagID, { dispatch }) => {
    try {
      const response = await AxiosInstance.delete(
        `/api/v1/tags/delete_tag/${tagID}`
      );
      dispatch(fetchTags());
      return { message: response.data.message };
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

const initialState = {
  tags: [],
  status: 'idle',
  error: null,
};

const TagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  // error: null,
  // reducers: {
  //   resetError: (state) => {
  //     state.error = null;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = 'loadingTags';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(addTags.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
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

export default TagSlice.reducer;
