import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../appURL/AxiosInstance';
import { login } from '../../pages/mainPage/components/LogIn';

export const fetchCalendar = createAsyncThunk('fetchCalendar', async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user_info'));
    const userId = userData?.id;
    const response = await AxiosInstance.get(
      `/api/v1/ticket/get-events/?user_id=${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
});

export const createCalender = createAsyncThunk(
  'createCalender',
  async (calender, { dispatch }) => {
    try {
      const response = await AxiosInstance.post(
        `/api/v1/ticket/create-events/?user_id=${calender.id}`,
        calender
      );
      // dispatch(fetchCalendar());
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

const CalenderSlice = createSlice({
  name: 'calender',
  initialState: {
    calenderData: [],
    status: 'idle',

    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendar.pending, (state) => {
        state.status = 'loadingCalender';
      })
      .addCase(fetchCalendar.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.calenderData = action.payload;
      })
      .addCase(fetchCalendar.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(createCalender.fulfilled, (state, action) => {
        state.calenderData.push(action.payload);
      })
      .addCase(login.fulfilled, (state) => {
        if (state.status !== 'idle') {
          state.status = 'idle';
        }
      });
  },
});

export default CalenderSlice.reducer;
