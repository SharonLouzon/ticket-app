import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Picker from "emoji-picker-react";
import { TwitterPicker } from "react-color";
import { Redirect } from "react-router-dom";

import { selectTicketById, updateTicket, addNewTicket } from "../ticketsSlice";

import PriorityPanel from "./PriorityPanel";
import DeleteModal from "./DeleteModal";

import "../styles/TicketEdit.scss";
import ShareModel from "./ShareModel.jsx";

const ticketEditSchema = yup.object().shape({
  title: yup.string().required().max(60),
  body: yup.string().max(255),
});

export default function TicketEdit({ match, history }) {
  const dispatch = useDispatch();
  const { ticketId } = match.params;
  const isEdit = match.url.includes("edit");

  const ticket = useSelector(state => selectTicketById(state, ticketId));
  const ticketsStatus = useSelector(state => state.tickets.status);
  const [error, setError] = useState("");

  const [priority, setPriority] = useState(ticket?.priority?.toString());
  const [colorPicked, setColorPicked] = useState(ticket?.color);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const handleSubmit = async values => {
    setLoading(true);
    const result = await dispatch(
      isEdit
        ? updateTicket({ body: values, ticketId })
        : addNewTicket({ body: values })
    );
    setLoading(false);
    if (result.error) {
      setError(result.error.message);
    } else if (ticketsStatus === "succeeded") {
      history.push(`/ticket/view/${ticketId}`);
    }
  };

  return isEdit && !ticket ? (
    <Redirect to="/" />
  ) : (
    <div className="h-100 p-3">
      <h3 className="h-100">{isEdit ? "Edit" : "Create"} Ticket</h3>

      <div className="d-flex justify-content-center">
        <div
          className="card ticket-edit-card p-3"
          style={{ boxShadow: `0px 0px 6px 0px ${colorPicked}` }}
        >

        
          <Formik
            initialValues={{
              title: ticket?.title || "",
              body: ticket?.body || "",
              priority: ticket?.priority || "",
              read: ticket?.read || false,
              color: ticket?.color || "",
              icon: ticket?.icon || "",
            }}
            validationSchema={ticketEditSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form className="form-container body d-flex flex-column align-items-start px-2 h-100">
                <div className="w-100 mb-5">
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <h5 className="form-label text-left ml-1">Title</h5>
                    {isEdit && (
                      <DeleteModal ticketId={ticket?.id} history={history} />
                    )}
                  </div>
                  <Field
                    name="title"
                    className="form-control"
                    disabled={loading}
                  />
                  {errors.title && touched.title && (
                    <div className="alert text-danger p-0 m-0">
                      {errors.title}
                    </div>
                  )}
                </div>
                <div className="w-100 mb-5">
                  <h5 className="form-label text-left ml-1">Body</h5>
                  <Field
                    name="body"
                    className="form-control"
                    component="textarea"
                    disabled={loading}
                  />
                  {errors.body && touched.body && (
                    <div className="alert text-danger p-0 m-0">
                      {errors.body}
                    </div>
                  )}
                </div>
                <div className="d-flex w-100 mb-5 align-items-center">
                  <h5 className="form-label text-left ml-1">Priority</h5>
                  <PriorityPanel
                    priority={priority}
                    setFieldValue={setFieldValue}
                    handlePriorityClick={({ target: { value } }) => {
                      setPriority(value);
                      return value;
                    }}
                    disabled={loading}
                  />
                </div>

                <div className="w-100 mb-5 d-flex justify-content-start align-items-center">
                  <h5 className="form-label text-left ml-1">Read</h5>
                  <Field
                    name="read"
                    type="checkbox"
                    className="form-checkbox ml-3 mr-2 mb-2 read-panel"
                    disabled={loading}
                  />
                </div>

                <div className="d-flex w-100 mb-5 align-items-center">
                  <h5
                    className="form-label text-left font-weight-bold ml-1"
                    style={{ color: colorPicked }}
                  >
                    Color
                  </h5>
                  <TwitterPicker
                    className="ml-4"
                    width="100%"
                    triangle="hide"
                    colors={[
                      "#ac0000",
                      "#EB144C",
                      "#FF6900",
                      "#FCB900",
                      "#FFF200",
                      "#a5dc7b",
                      "#00D084",
                      "#afffff",
                      "#8ED1FC",
                      "#0693E3",
                      "#ABB8C3",
                      "#F78DA7",
                      "#9900EF",
                      "#000000",
                    ]}
                    onChange={(color, event) => {
                      setFieldValue("color", color?.hex || "black");
                      setColorPicked(color?.hex || "black");
                    }}
                    color={values?.color || "black"}
                  />
                </div>

                <div className="w-100 mb-4">
                  <div className="d-flex align-items-center">
                    <h5 className="form-label text-left ml-1">Icon</h5>
                    <Field
                      name="icon"
                      className="form-control ml-2 mb-2 border-0"
                      disabled={loading}
                      value={values.icon}
                      style={{ width: "50px" }}
                    />
                  </div>
                  <Picker
                    onEmojiClick={(event, emojiObject) => {
                      setFieldValue("icon", emojiObject?.emoji);
                    }}
                    disableSkinTonePicker={true}
                    disableSearchBar={true}
                    pickerStyle={{ width: "100%", height: "200px" }}
                    disableAutoFocus={true}
                  />
                  <div className="alert text-danger p-0 mt-5 h5">{error}</div>
                </div>
                <div className="d-flex justify-content-around w-100">
                  <button
                    className="btn btn-outline-secondary round-btn control-btn"
                    onClick={() => history.push("/")}
                    type="button"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <ShareModel/>
                  <button
                    className="btn btn-primary round-btn control-btn"
                    type="submit"
                    disabled={loading}
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          
        </div>
      </div>
    </div>
  );
}
