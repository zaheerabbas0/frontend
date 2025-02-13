import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../appURL/AxiosInstance';
import { login } from '../../pages/mainPage/components/LogIn';

export const fetchProjects = createAsyncThunk('fetchProjects', async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user_info'));
    const userId = userData?.id;
    const response = await AxiosInstance.get(
      `/api/v1/project/get-project/${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
});

export const createProject = createAsyncThunk(
  'createProject',
  async (project, { dispatch }) => {
    try {
      const response = await AxiosInstance.post(
        '/api/v1/project/create-project',
        project
      );
      dispatch(fetchProjects());
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  'updateProject',
  async ({ id, updatedProject }, { dispatch }) => {
    try {
      if (updatedProject.hasOwnProperty('created_by')) {
        delete updatedProject.created_by;
      }
      const response = await AxiosInstance.put(
        `/api/v1/project/update-project/${id}`,
        updatedProject
      );
      dispatch(fetchProjects());
      return { id, updatedProject: response.data };
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  'deleteProject',
  async (ids, { rejectWithValue, dispatch }) => {
    try {
      const idsArray = Array.isArray(ids) ? ids : [ids];
      await AxiosInstance.delete(`/api/v1/project/delete-projects`, {
        data: idsArray,
      });
      dispatch(fetchProjects());
      return idsArray;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchProjectDetails = createAsyncThunk(
  'fetchProjectDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `/api/v1/project/get-tickets-by-project/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  projects: [],
  projectDetails: null,
  status: 'idle',
  error: null,
};

const ProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loadingProjects';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const { id, updatedProject } = action.payload;
        const index = state.projects.findIndex((project) => project.id === id);
        if (index !== -1) {
          state.projects[index] = updatedProject;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => !action.payload.includes(project.id)
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchProjectDetails.pending, (state) => {
        state.status = 'loadingProjectDetails';
      })
      .addCase(fetchProjectDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projectDetails = action.payload;
      })
      .addCase(fetchProjectDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(login.fulfilled, (state) => {
        if (state.status !== 'idle') {
          state.status = 'idle';
        }
      });
  },
});

export default ProjectSlice.reducer;
