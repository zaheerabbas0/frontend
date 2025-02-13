import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../appURL/AxiosInstance';
import { login } from '../../pages/mainPage/components/LogIn';
import {
  Pending_Approval_Key,
  RESOLVED_KEY,
} from '../../constants/FieldOptionConstants';

export const fetchTickets = createAsyncThunk('fetchTickets', async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user_info'));
    const ticketID = userData?.id;
    const response = await AxiosInstance.get(
      `/api/v1/ticket/get-tickets/${ticketID}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || error.message);
  }
});

export const createTicket = createAsyncThunk(
  'createTicket',
  async (ticket, { dispatch }) => {
    try {
      const response = await AxiosInstance.post(
        `/api/v1/ticket/create-ticket`,
        ticket
      );
      dispatch(fetchTickets());
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const updateTicket = createAsyncThunk(
  'updateTicket',
  async ({ id, updatedTicket }, { dispatch }) => {
    try {
      if (updatedTicket.hasOwnProperty('created_by_id')) {
        delete updatedTicket.created_by_id;
      }
      const response = await AxiosInstance.put(
        `/api/v1/ticket/update-ticket/${id}`,
        updatedTicket
      );
      dispatch(fetchTickets());
      return { id, updatedTicket: response.data };
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const deleteTicket = createAsyncThunk(
  'deleteTicket',
  async (ids, { dispatch }) => {
    try {
      const idsArray = Array.isArray(ids) ? ids : [ids];
      await AxiosInstance.delete(`/api/v1/ticket/delete-tickets`, {
        data: idsArray,
      });
      dispatch(fetchTickets());
      return idsArray;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const postComment = createAsyncThunk(
  'postComment',
  async ({ ticket_id, comment, assignees }, { dispatch }) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user_info'));
      const userId = userData?.id;

      const response = await AxiosInstance.post(
        `/api/v1/ticket/create-comments`,
        {
          content: comment,
          ticket_id: ticket_id,
          user_id: userId,
        }
      );
      dispatch(fetchTickets());
      return { ticket_id, comment: response.data };
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const fetchComments = createAsyncThunk(
  'fetchComments',
  async (ticketId) => {
    try {
      const response = await AxiosInstance.get(
        `/api/v1/ticket/get-comments/${ticketId}`
      );
      return { ticketId, comments: response.data };
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const editComment = createAsyncThunk(
  'comments/editComment',
  async ({ comment_id, comment }) => {
    try {
      const response = await AxiosInstance.put(
        `/api/v1/ticket/comments/${comment_id}`,
        null,
        {
          params: {
            content: comment,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({ comment_id }) => {
    try {
      const response = await AxiosInstance.delete(
        `/api/v1/ticket/comments/${comment_id}`
      );
      return comment_id;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const updateTicketStatus = createAsyncThunk(
  'updateTicketStatus',
  async ({ id, status }, { dispatch }) => {
    try {
      const response = await AxiosInstance.put(
        `/api/v1/ticket/update-ticket/${id}`,
        { status }
      );
      const updatedTicket = { id, status };

      return { id, updatedTicket };
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const escalateTicket = createAsyncThunk(
  'ticket/escalateTicket',
  async ({ escalationData }) => {
    try {
      const response = await AxiosInstance.post(
        `/api/v1/ticket/create-escalation/`,
        {
          ...escalationData,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const updateForApproval = createAsyncThunk(
  'ticket/updateForApproval',
  async (payload) => {
    try {
      const response = await AxiosInstance.put(
        `/api/v1/ticket/approve-ticket/`,
        payload
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const fetchPendingApprovals = createAsyncThunk(
  'ticket/fetchPendingApprovals',
  async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user_info'));
      const userId = userData?.id;
      const response = await AxiosInstance.get(
        `/api/v1/ticket/pending-approvals/${userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

export const approveResolutionAction = createAsyncThunk(
  'approveResolutionAction',
  async ({ id, status }, { dispatch }) => {
    try {
      const response = await AxiosInstance.put(
        `/api/v1/ticket/update-ticket/${id}`,
        { status }
      );
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  }
);

const initialState = {
  tickets: [],
  templates: [],
  approvals: [],
  comments: {},
  assignees: [],
  status: 'idle',
  error: null,
};

const TicketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loadingTickets';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const tickets = action.payload.filter(
          (ticket) =>
            !ticket.template_name && ticket.status !== Pending_Approval_Key
        );

        const templates = action.payload
          .filter((ticket) => ticket.template_name)
          .map((ticket) => ({ ...ticket, template: ticket.template_name }));

        const approvals = action.payload.filter(
          (ticket) => ticket.status === Pending_Approval_Key
        );
        state.tickets = tickets;
        state.templates = templates;
        state.approvals = approvals;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        if (action.payload.template_name) {
          state.templates.push(action.payload);
        } else {
          state.tickets.push(action.payload);
        }
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        const { id, updatedTicket } = action.payload;
        const index = state.tickets.findIndex((ticket) => ticket.id === id);
        if (index !== -1) {
          state.tickets[index] = updatedTicket;
        }
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.error = action.error.message;
        console.error('Update Ticket Error:', action.error.message);
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        const deletedIds = action.payload;
        state.tickets = state.tickets.filter(
          (ticket) => !deletedIds.includes(ticket.id)
        );
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(postComment.pending, (state) => {
        state.status = 'loadingComments';
      })
      .addCase(postComment.fulfilled, (state, action) => {
        const { ticketId, comment } = action.payload;
        const ticket = state.tickets.find((ticket) => ticket.id === ticketId);
        if (ticket) {
          ticket.comments = [...(ticket.comments || []), comment];
        }
        state.comments[ticketId] = [
          ...(state.comments[ticketId] || []),
          comment,
        ];
      })
      .addCase(postComment.rejected, (state, action) => {
        state.error = action.error.message;
        console.error('Post Comment Error:', action.error.message);
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { ticketId, comments } = action.payload;
        state.comments[ticketId] = comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const { id, ticket_id, content } = action.payload;
        const ticketComments = state.comments[ticket_id] || [];
        const index = ticketComments.findIndex((c) => c.id === id);
        if (index !== -1) {
          ticketComments[index].content = content;
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const commentId = action.payload;
        for (const ticketId in state.comments) {
          state.comments[ticketId] = state.comments[ticketId].filter(
            (comment) => comment.id !== commentId
          );
        }
      })
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        const { id, updatedTicket } = action.payload;
        const index = state.tickets.findIndex((ticket) => ticket.id === id);
        if (index !== -1) {
          state.tickets[index].status = updatedTicket.status;
        }
      })

      .addCase(escalateTicket.fulfilled, (state, action) => {
        // console.log('LOG TICKET ID ', action.payload);

        const escalatedTicket = action.payload;
        const index = state.tickets.findIndex(
          (ticket) => ticket.id === escalatedTicket.ticket_id
        );
        if (index !== -1) {
          state.tickets[index].is_escalated = true;
        }
      })
      .addCase(updateForApproval.fulfilled, (state, action) => {
        const { ticket: updatedTicket } = action.payload.data;

        state.tickets = state.tickets.filter(
          (ticket) => ticket.id !== updatedTicket.id
        );
        state.approvals.push({ ...updatedTicket, hasResolution: true });
      })
      .addCase(approveResolutionAction.fulfilled, (state, action) => {
        const { ticket: approvedTicket } = action.payload.data;

        const index = state.approvals.findIndex(
          (ticket) => ticket.id === approvedTicket.id
        );

        if (index !== -1) {
          state.approvals[index].status = RESOLVED_KEY;
          state.tickets.push(state.approvals[index]);
          state.approvals.splice(index, 1);
        }
      })
      .addCase(login.pending, () => {
        return initialState;
      });
  },
});

export default TicketSlice.reducer;
