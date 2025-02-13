import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../pages/mainPage/components/LogIn';
import AxiosInstance from '../../appURL/AxiosInstance';

export const fetchAdmins = createAsyncThunk('fetchAdmins', async () => {
  try {
    // const userData = JSON.parse(localStorage.getItem('admin_info'));
    // const userId = userData?.id;
    const response = await AxiosInstance.get(`/api/v1/user/get-admins`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || error.message);
  }
});

export const createAdmin = createAsyncThunk(
  'createAdmin',
  async (admin, { dispatch }) => {
    try {
      const response = await AxiosInstance.post(
        `/api/v1/auth/create-admin`,
        admin
      );
      dispatch(fetchAdmins());
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const updateAdmin = createAsyncThunk(
  'updateAdmin',
  async ({ id, updatedAdmin }, { dispatch }) => {
    try {
      if (updateAdmin.hasOwnProperty('created_by_id')) {
        delete updateAdmin.created_by_id;
      }
      const response = await AxiosInstance.put(
        `/api/v1/user/users/${id}`,
        updatedAdmin
      );
      dispatch(fetchAdmins());
      return { id, updatedAdmin: response.data };
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  'deleteAdmin',
  async (ids, { dispatch }) => {
    try {
      const idsArray = Array.isArray(ids) ? ids : [ids];
      await AxiosInstance.delete(`/api/v1/user/users`, {
        data: idsArray,
      });
      dispatch(fetchAdmins());
      return idsArray;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const fetchAdminDetails = createAsyncThunk(
  'fetchAdminDetails',
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

export const fetchAdminUsers = createAsyncThunk(
  'admin/fetchAdminUsers',
  async (id) => {
    try {
      const response = await AxiosInstance.get(
        `/api/v1/user/users/creator/${id}`
      );

      const filteredUsers = response.data.filter(
        (user) => user.role_id === 'User'
      );

      return filteredUsers;
      // return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

const initialState = {
  admins: [],
  adminUsers: [],
  adminDetails: [],
  status: 'idle',
  error: null,
};

const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminUsers: (state) => {
      state.adminUsers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.status = 'loadingAdmins';
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.admins.push(action.payload);
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        const { id, updatedAdmin } = action.payload;
        const index = state.admins.findIndex((admin) => admin.id === id);
        if (index !== -1) {
          state.admins[index] = updatedAdmin;
        }
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        const deletedIds = action.payload;
        state.admins = state.admins.filter(
          (admin) => !deletedIds.includes(admin.id)
        );
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchAdminDetails.pending, (state) => {
        state.status = 'loadingAdminDetails';
      })
      .addCase(fetchAdminDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const tickets = action.payload.filter(
          (ticket) => !ticket.template_name
        );
        state.adminDetails = tickets;
      })
      .addCase(fetchAdminDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchAdminUsers.pending, (state) => {
        state.status = 'loadAdminUsers';
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.adminUsers = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(login.pending, () => {
        return initialState;
      });
  },
});

export const { clearAdminUsers } = AdminSlice.actions;
export default AdminSlice.reducer;
