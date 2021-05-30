import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteTicket } from "../ticketsSlice";

export default function DeleteModal({ ticketId, history }) {
  const dispatch = useDispatch();

  const [modalView, setModalView] = useState(false);
  const [error, setError] = useState(false);

  const ticketsStatus = useSelector(state => state.tickets.status);
  const loading = ticketsStatus === "loading";

  const handleDeleteTicket = async () => {
    const result = await dispatch(deleteTicket(ticketId));

    if (result.error) {
      setError(result.error.message);
    } else if (ticketsStatus === "succeeded") {
      setModalView(false);
      history.push("/");
    }
  };

  useEffect(() => {
    return () => {
      setModalView(false);
    };
  }, []);

  return (
    <>
      <button
        style={{ width: "50px" }}
        className="btn btn-outline-link control-btn trash"
        type="button"
        disabled={loading}
        onClick={() => setModalView(prevState => !prevState)}
      >
        <i className="fas fa-trash-alt text-danger" />
      </button>
      <div
        className={`modal-backdrop d-${modalView ? "block" : "none"}`}
        tabIndex="-1"
        onClick={event => {
          if (event.target.getAttribute("name")) setModalView(false);
        }}
      >
        <div
          name="modal-backdrop"
          className={`modal ${
            modalView ? "d-block" : "fade"
          } d-flex align-items-center`}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Ticket</h5>
                <button
                  type="button"
                  className="close"
                  disabled={loading}
                  onClick={() => setModalView(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body h6">
                Are you sure you want to delete this ticket?
              </div>
              <div className="alert text-danger p-0 m-0 h5">{error}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary round-btn"
                  onClick={() => setModalView(false)}
                  disabled={loading}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger round-btn"
                  onClick={handleDeleteTicket}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
