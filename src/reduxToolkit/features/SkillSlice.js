import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../appURL/AxiosInstance';
import { login } from '../../pages/mainPage/components/LogIn';

export const fetchSkill = createAsyncThunk('fetchSkill', async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user_info'));
    const userId = userData?.id;
    const response = await AxiosInstance.get(`/api/v1/skills/${userId}`);
    return response?.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || error.message);
  }
});

export const addSkill = createAsyncThunk(
  'addSkill',
  async (skill, { dispatch }) => {
    try {
      const response = await AxiosInstance.post(`/api/v1/skills/`, skill);
      dispatch(fetchSkill());
      return { message: response.data.message };
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const deleteSkill = createAsyncThunk(
  'deleteTag',
  async (skillID, { dispatch }) => {
    try {
      const response = await AxiosInstance.delete(`/api/v1/skills/${skillID}`);
      dispatch(fetchSkill());
      return { message: response.data.message };
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

const SkillSlice = createSlice({
  name: 'skills',
  initialState: {
    skills: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkill.pending, (state) => {
        state.status = 'loadingSkills';
      })
      .addCase(fetchSkill.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.skills = action.payload;
      })
      .addCase(fetchSkill.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(login.fulfilled, (state) => {
        if (state.status !== 'idle') {
          state.status = 'idle';
        }
      });
  },
});

export default SkillSlice.reducer;
