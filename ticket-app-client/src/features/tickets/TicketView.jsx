import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { selectTicketById } from "./ticketsSlice";

import { priorityColors } from "../../components/formReusable/priorityColors";

export default function TicketView({ match, history }) {
  const { ticketId } = match.params;
  const ticket = useSelector(state => selectTicketById(state, ticketId));

  return !ticket ? (
    <Redirect to="/" />
  ) : (
    <div className="h-100 p-3">
      <h3 className="h-100">View Ticket</h3>
      {
        <div className="d-flex justify-content-center">
          <div
            className="card ticket-edit-card p-3"
            style={{ boxShadow: `0px 0px 6px 0px ${ticket.color}` }}
          >
            <div className="form-container body d-flex flex-column align-items-start px-2 h-100">
              <div className="d-flex align-items-center mb-5">
                <h5 className="form-label text-left ml-1">Title:</h5>
                <h6 className="ml-3 text-break">{ticket.title}</h6>
              </div>
              <div className="d-flex w-100 align-items-start mb-5">
                <h5 className="form-label text-left ml-1">Body: </h5>
                <h6 className="ml-3 text-break text-left">{ticket.body}</h6>
              </div>
              <div className="d-flex w-100 align-items-center mb-5">
                <h5 className="form-label text-left ml-1">Priority: </h5>
                <h5
                  className={`ml-3 border priority-btn badge-pill badge-${
                    priorityColors[ticket.priority]
                  }`}
                >
                  {ticket.priority}
                </h5>
              </div>

              <div className="d-flex w-100 align-items-center mb-5">
                <h5 className="form-label text-left ml-1">Status:</h5>
                <h5 className="ml-3">
                  <span
                    className={`form-label text-left ml-1 badge badge-pill badge-${
                      ticket.read ? "success" : "secondary"
                    } `}
                  >
                    {ticket.read ? "Read" : "Not read"}
                  </span>
                </h5>
              </div>

              <div className="d-flex w-100 align-items-center mb-5">
                <h5 className="form-label text-left ml-1">Color: </h5>
                <h6
                  className="ml-3 font-weight-bold"
                  style={{ color: ticket?.color }}
                >
                  {ticket?.color}
                </h6>
              </div>

              <div className="d-flex w-100 align-items-center mb-5">
                <h5 className="form-label text-left ml-1">Icon</h5>
                <h6 className="ml-3 text-break">{ticket?.icon}</h6>
              </div>

              <div className="d-flex justify-content-around w-100">
                <button
                  className="btn btn-outline-primary round-btn control-btn"
                  onClick={() => history.push("/")}
                  type="button"
                >
                  Back
                </button>
                <button
                  className="btn btn-secondary round-btn control-btn"
                  onClick={() => history.push(`/ticket/edit/${ticket?.id}`)}
                  type="button"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
