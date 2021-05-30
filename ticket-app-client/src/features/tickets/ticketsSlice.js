import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { api } from "../../api";

const ticketsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = ticketsAdapter.getInitialState({
  status: "idle",
  error: null,
});

// ***** Async Thunks *****

// get all tickets
export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async () => {
    const response = await api.get({ endpoint: "/ticket/all" });
    return response;
  }
);

// get specific ticket
export const fetchTicket = createAsyncThunk(
  "tickets/fetchTicket",
  async ticketId => await api.get({ endpoint: `/ticket/${ticketId}` })
);

// create new ticket
export const addNewTicket = createAsyncThunk(
  "tickets/addNewTicket",
  async ({ body }) => {
    const response = await api.post({ endpoint: "/ticket/create", body });
    // await new Promise(res => {
    //   setTimeout(() => {
    //     res();
    //   }, 3000);
    // });
    return response;
  }
);

// update exist ticket
export const updateTicket = createAsyncThunk(
  "tickets/updateTicket",
  async ({ body, ticketId }) =>
    await api.put({ endpoint: `/ticket/update/${ticketId}`, body })
);

export const deleteTicket = createAsyncThunk(
  "tickets/deleteTicket",
  async ticketId => await api.delete({ endpoint: `/ticket/delete/${ticketId}` })
);

// ***** Slice *****
const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    resetTickets: state => initialState,
  },
  extraReducers: {
    [fetchTickets.pending]: state => {
      state.status = "loading";
    },
    [fetchTickets.fulfilled]: (state, action) => {
      state.status = "succeeded";
      ticketsAdapter.upsertMany(state, action.payload);
    },
    [fetchTickets.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    [updateTicket.pending]: state => {
      state.status = "loading";
    },
    [updateTicket.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      state.status = "succeeded";
      ticketsAdapter.updateOne(state, { id, changes });
    },
    [updateTicket.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    [deleteTicket.pending]: state => {
      state.status = "loading";
    },
    [deleteTicket.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.status = "succeeded";
      ticketsAdapter.removeOne(state, id);
    },
    [deleteTicket.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    [addNewTicket.pending]: state => {
      state.status = "loading";
    },
    [addNewTicket.fulfilled]: (state, action) => {
      state.status = "succeeded";
      ticketsAdapter.upsertOne(state, action.payload);
    },
    [addNewTicket.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default ticketSlice.reducer;

export const { resetTickets } = ticketSlice.actions;

export const {
  selectAll: selectAllTickets,
  selectIds: selectTicketIds,
  selectById: selectTicketById,
} = ticketsAdapter.getSelectors(state => state.tickets);
