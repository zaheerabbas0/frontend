import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../appURL/AxiosInstance';
import Swal from 'sweetalert2';
import { login } from '../../pages/mainPage/components/LogIn';

export const fetchContracts = createAsyncThunk('fetchContracts', async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user_info'));
    const userId = userData?.id;

    const response = await AxiosInstance.get(
      `/api/v1/contract/get-contracts/${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
});

export const createContract = createAsyncThunk(
  'createContract',
  async (contract, { dispatch }) => {
    try {
      const response = await AxiosInstance.post(
        '/api/v1/contract/create-contract',
        contract
      );
      dispatch(fetchContracts());
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

export const updateContract = createAsyncThunk(
  'updateContract',
  async ({ id, updatedContract }, { dispatch }) => {
    try {
      const response = await AxiosInstance.put(
        `/api/v1/contract/update-contract/${id}`,
        updatedContract
      );
      dispatch(fetchContracts());
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Contract updated successfully',
        timer: 1500,
        showConfirmButton: false,
      });
      return { id, updatedContract: response.data };
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

export const deleteContract = createAsyncThunk(
  'deleteContract',
  async (ids, { rejectWithValue, dispatch }) => {
    try {
      const idsArray = Array.isArray(ids) ? ids : [ids];
      await AxiosInstance.delete(`/api/v1/contract/delete-contracts/`, {
        data: idsArray,
      });
      dispatch(fetchContracts());
      return idsArray;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchContractDetails = createAsyncThunk(
  'fetchContractDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `/api/v1/contract/get-tickets-by-contract/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  contracts: [],
  contractDetails: null,
  status: 'idle',
  error: null,
};

const ContractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContracts.pending, (state) => {
        state.status = 'loadingContracts';
      })
      .addCase(fetchContracts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contracts = action.payload;
      })
      .addCase(fetchContracts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(createContract.fulfilled, (state, action) => {
        state.contracts.push(action.payload);
      })
      .addCase(updateContract.fulfilled, (state, action) => {
        const { id, updatedContract } = action.payload;
        const index = state.contracts.findIndex(
          (contract) => contract.id === id
        );
        if (index !== -1) {
          state.contracts[index] = updatedContract;
        }
      })
      .addCase(deleteContract.fulfilled, (state, action) => {
        state.contracts = state.contracts.filter(
          (contract) => contract.id !== action.payload
        );
      })
      .addCase(deleteContract.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchContractDetails.pending, (state) => {
        state.status = 'loadingContractDetails';
      })
      .addCase(fetchContractDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contractDetails = action.payload;
      })
      .addCase(fetchContractDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(login.pending, () => {
        return initialState;
      });
  },
});

export default ContractSlice.reducer;
