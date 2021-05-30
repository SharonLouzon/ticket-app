import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./features/tickets/ticketsSlice";
import userReducer from "./features/user/userSlice";

export default configureStore({
  reducer: {
    tickets: ticketsReducer,
    user: userReducer,
  },
});
