import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../appURL/AxiosInstance';
import Swal from 'sweetalert2';
import { login } from '../../pages/mainPage/components/LogIn';
// import { notification } from "antd";

export const fetchCustomers = createAsyncThunk('fetchCustomers', async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user_info'));
    const userId = userData?.id;
    const response = await AxiosInstance.get(
      `/api/v1/customer/get-customers/${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail);
  }
});

export const createCustomer = createAsyncThunk(
  'createCustomer',
  async (customer, { dispatch }) => {
    try {
      const response = await AxiosInstance.post(
        '/api/v1/customer/create-customer',
        customer
      );
      dispatch(fetchCustomers());
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  'updateCustomer',
  async ({ id, updatedCustomer }, { dispatch }) => {
    try {
      const response = await AxiosInstance.put(
        `/api/v1/customer/update-customer/${id}`,
        updatedCustomer
      );
      dispatch(fetchCustomers());
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Customer updated successfully',
        timer: 1500,
        showConfirmButton: false,
      });
      return { id, updatedCustomer: response.data };
    } catch (error) {
      throw new Error(error.response?.data?.detail);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  'deleteCustomer',
  async (ids, { dispatch }) => {
    try {
      const idsArray = Array.isArray(ids) ? ids : [ids];

      await AxiosInstance.delete(`/api/v1/customer/delete-customers`, {
        data: idsArray,
      });
      dispatch(fetchCustomers());
      return idsArray;
    } catch (error) {
      throw new Error(error.response?.data?.detail);
    }
  }
);

export const fetchCustomerDetails = createAsyncThunk(
  'fetchCustomerDetails',
  async (id) => {
    try {
      const response = await AxiosInstance.get(
        `/api/v1/user/get-tickets-by-user/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail);
    }
  }
);

const initialState = {
  customers: [],
  customerDetails: null,
  status: 'idle',
  error: null,
};

const CustomerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loadingCustomers';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const { id, updatedCustomer } = action.payload;
        const index = state.customers.findIndex(
          (customer) => customer.id === id
        );
        if (index !== -1) {
          state.customers[index] = updatedCustomer;
        }
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(
          (customer) => customer.id !== action.payload
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCustomerDetails.pending, (state) => {
        state.status = 'loadingCustomerDetails';
      })
      .addCase(fetchCustomerDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerDetails = action.payload;
      })
      .addCase(fetchCustomerDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(login.pending, () => {
        return initialState;
      });
  },
});

export default CustomerSlice.reducer;
