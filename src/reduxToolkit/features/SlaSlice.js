import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../appURL/AxiosInstance';
import { login } from '../../pages/mainPage/components/LogIn';

export const fetchSla = createAsyncThunk('fetchSla', async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user_info'));
    const userId = userData?.id;
    const response = await AxiosInstance.get(
      `/api/v1/sla/get-sla?user_id=${userId}`
    );

    const formatedSla = response?.data?.map((sla) => ({
      id: sla?.id,
      name: `${sla?.name} - ${sla?.duration} Hours`,
    }));

    return formatedSla;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
});

export const createSla = createAsyncThunk(
  'createSla',
  async (sla, { dispatch }) => {
    try {
      const response = await AxiosInstance.post(`/api/v1/sla/add-sla/`, sla);

      if (response.data?.message !== 'SLA added successfully') {
        throw new Error(response.data.message);
      }

      dispatch(fetchSla());
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

const SlaSlice = createSlice({
  name: 'sla',
  initialState: {
    slas: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSla.pending, (state) => {
        state.status = 'loadingSla';
      })
      .addCase(fetchSla.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.slas = action.payload;
      })
      .addCase(fetchSla.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createSla.fulfilled, (state, action) => {
        state.slas.push(action.payload);
      })
      .addCase(login.fulfilled, (state) => {
        if (state.status !== 'idle') {
          state.status = 'idle';
        }
      });
  },
});

export default SlaSlice.reducer;
