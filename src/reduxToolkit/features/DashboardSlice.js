// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import AxiosInstance from "../../appURL/AxiosInstance";

// export const fetchTicketStats = createAsyncThunk(
//   "dashboard/fetchTicketStats",
//   async (userId) => {
//     const response = await AxiosInstance.get(
//       `/api/v1/dashboard/tickets-stats/${userId}`
//     );
//     return response.data;
//   }
// );

// export const fetchStatusByRegion = createAsyncThunk(
//   "dashboard/fetchStatusByRegion",
//   async ({ userId, filter }) => {
//     const response = await AxiosInstance.get(
//       `/api/v1/dashboard/region-status/${userId}?region=${filter}`
//     );
//     return response.data;
//   }
// );

// export const fetchSlaVisibility = createAsyncThunk(
//   "dashboard/fetchSlaVisibility",
//   async ({ userId, filter }) => {
//     const response = await AxiosInstance.get(
//       `/api/v1/dashboard/sla-visibility/${userId}?period=${filter}`
//     );
//     return response.data;
//   }
// );

// export const fetchTicketsPerProject = createAsyncThunk(
//   "dashboard/fetchTicketsPerProject",
//   async ({ userId, filter }) => {
//     const response = await AxiosInstance.get(
//       `/api/v1/dashboard/tickets-per-project/${userId}?period=${filter}`
//     );
//     return response.data;
//   }
// );

// export const fetchTotalUsersData = createAsyncThunk(
//   "dashboard/fetchTotalUsersData",
//   async (userId) => {
//     const response = await AxiosInstance.get(
//       `/api/v1/dashboard/total-created-users/${userId}`
//     );
//     return response.data;
//   }
// );

// const initialState = {
//   ticketStats: {
//     totalTicketsCount: 0,
//     totalSLAsCount: 0,
//     resolvedWithinSLAsCount: 0,
//     SLAsBreachedCount: 0,
//   },

//   statusByRegion: [],
//   slaVisibilityData: [],
//   ticketsPerProjectData: [],
//   totalUsersData: [],
//   loading: false,
//   error: null,
// };

// const DashboardSlice = createSlice({
//   name: "dashboard",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Handle ticket stats fetch
//       .addCase(fetchTicketStats.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchTicketStats.fulfilled, (state, action) => {
//         state.loading = false;
//         state.ticketStats = {
//           totalTicketsCount: action.payload.total_tickets,
//           totalSLAsCount: action.payload.total_sla,
//           resolvedWithinSLAsCount: action.payload.resolved,
//           SLAsBreachedCount: action.payload.breached,
//         };
//       })
//       .addCase(fetchTicketStats.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       // Handle status by region fetch
//       .addCase(fetchStatusByRegion.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchStatusByRegion.fulfilled, (state, action) => {
//         state.loading = false;
//         state.statusByRegion = Array.isArray(action.payload)
//           ? action.payload
//           : [];
//       })
//       .addCase(fetchStatusByRegion.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       // Handle SLA visibility fetch
//       .addCase(fetchSlaVisibility.fulfilled, (state, action) => {
//         state.slaVisibilityData = action.payload;
//       })
//       .addCase(fetchSlaVisibility.rejected, (state, action) => {
//         state.error = action.error.message;
//       })

//       // Handle tickets per project fetch
//       .addCase(fetchTicketsPerProject.fulfilled, (state, action) => {
//         state.ticketsPerProjectData = action.payload;
//       })
//       .addCase(fetchTicketsPerProject.rejected, (state, action) => {
//         state.error = action.error.message;
//       })

//       // Handle total users fetch
//       .addCase(fetchTotalUsersData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchTotalUsersData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.totalUsersData = action.payload;
//       })
//       .addCase(fetchTotalUsersData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default DashboardSlice.reducer;
