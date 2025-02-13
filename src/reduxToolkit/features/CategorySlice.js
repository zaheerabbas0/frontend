import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../appURL/AxiosInstance';
import { login } from '../../pages/mainPage/components/LogIn';

export const fetchCategories = createAsyncThunk('fetchCategories', async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user_info'));
    const userId = userData?.id;
    const response = await AxiosInstance.get(
      `/api/v1/category/get-categories-data/${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
});

export const addCategories = createAsyncThunk(
  'addCategories',
  async (category, { dispatch }) => {
    try {
      const response = await AxiosInstance.post(
        '/api/v1/category/add-categories',
        category
      );
      dispatch(fetchCategories());
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail);
    }
  }
);

export const addSubCategories = createAsyncThunk(
  'addSubCategories',
  async (category, { dispatch }) => {
    try {
      const response = await AxiosInstance.post(
        '/api/v1/category/add-sub_categories',
        category
      );
      dispatch(fetchCategories());
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'deleteCategory',
  async (categoryID, { rejectWithValue, dispatch }) => {
    try {
      await AxiosInstance.delete(
        `/api/v1/category/delete-category/${categoryID}`
      );
      dispatch(fetchCategories());
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  }
);

export const deleteSubCategory = createAsyncThunk(
  'deleteSubCategory',
  async (subCategoryID, { rejectWithValue, dispatch }) => {
    try {
      await AxiosInstance.delete(
        `/api/v1/category/delete-sub_category/${subCategoryID}`
      );
      dispatch(fetchCategories());
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  }
);

const initialState = {
  categories: [],
  status: 'idle',
  error: null,
  subError: null,
};

const CategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  error: null,
  subError: null,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetSubError: (state) => {
      state.subError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loadingCategories';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(addCategories.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addSubCategories.rejected, (state, action) => {
        state.subError = action.error.message;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(login.fulfilled, (state) => {
        if (state.status !== 'idle') {
          state.status = 'idle';
        }
      });
  },
});

export default CategoriesSlice.reducer;
