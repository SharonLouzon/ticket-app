import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as yup from "yup";

import { registerUser } from "./userSlice";

import "./styles/loginForm.scss";

import FormFieldContainer from "../../components/formReusable/FormFieldContainer";
import FormButton from "../../components/formReusable/FormButton";
import Popup from "reactjs-popup";

//import KeysModel from "./KeysModel.jsx";

const signUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2)
    .max(30)
    .required("first name is a required field"),
  lastName: yup
    .string()
    .min(2)
    .max(30)
    .required("last name is a required field"),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/,
      //  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      () => (
        <>
          <li>must contain 8 characters</li>
          <li>one uppercase</li>
          <li>one lowercase</li>
          <li>one number</li>
        </>
      )
    )
    .required(),
  passwordConfirmation: yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "both passwords need to be the same")
      .required("confirm password"),
  }),
});

export default function Signup({ history }) {
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(null);
  const [isPopupShow, setIsPopupShow] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const handleSignUp = async values => {
    setValues(values);
    setIsPopupShow(true);
  };

  async function handleOkPopupCLicked() {
    setLoading(true);
    const result = await dispatch(registerUser(values));
    console.log(result);
    setLoading(false);
    if (result.error) {
      setError(result.error.message);
    }
    // history.push("/");
  }

  return (
    <div className="d-flex justify-content-center align-items-start w-100 h-100">

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={values => handleSignUp(values)}
      >
        {({ errors, touched }) => (
          <Form autoComplete="false" className="d-flex flex-column login-form">
            <div className="shadow p-4 mt-5 bg-white form-container">
              <h2 className="text-center mb-2">Sign up</h2>
              <FormFieldContainer
                name="firstName"
                loading={loading}
                placeholder="First name"
                errors={errors}
                touched={touched}
              />
              <FormFieldContainer
                name="lastName"
                loading={loading}
                placeholder="Last name"
                errors={errors}
                touched={touched}
              />
              <FormFieldContainer
                name="email"
                loading={loading}
                placeholder="Email"
                errors={errors}
                touched={touched}
              />
              <FormFieldContainer
                name="password"
                type="password"
                loading={loading}
                placeholder="Password"
                errors={errors}
                touched={touched}
              />
              <FormFieldContainer
                name="passwordConfirmation"
                type="password"
                loading={loading}
                placeholder="Confirm password"
                errors={errors}
                touched={touched}
              />

              <div className="d-flex flex-column align-items-center">
                <div className="alert text-danger p-0 form-error">{error}</div>
                  
                  




                <FormButton
                    type={"submit"}
                    loading={loading}
                    color={"btn-primary"}
                    btnText={"Sign up"}
                />
                <FormButton
                  loading={loading}
                  color={"btn-outline-primary"}
                  btnText={"Back"}
                  onClick={() => history.push("/login")}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Popup
                  open = {isPopupShow}
                  onClose={()=>{setIsPopupShow(false)}}
                      // trigger={open => (values?true:false)}
                      modal
                      nested
                    >
                    {(close) => (
                            <div className="share-modal">

                              <button className="close" onClick={close}>
                                &times;
                              </button>
                              <div className="header"> Your Keys for sharing tickets with friends </div>
                              <div className="content">
                                <span>The Public Key</span>
                                <input type="email" id="email" name="email" />
                              </div>
                              <div className="content">
                                <span>The Private Key</span>
                                <input type="password" id="passowrd" name="password" />
                                <span class="text-danger">Please Store the keys in a secure and accessible location.</span>
                                <span class="text-danger">Share with friends only your public key for reciving tickes.</span>
                              </div>
                              <div className="actions">
                                <button
                                  className="btn btn-outline-secondary round-btn"
                                  onClick={() => handleOkPopupCLicked()}
                                >
                                  OK
                                </button>

                              </div>


                            </div>
                    )}
        
                  </Popup>

    </div>
  );
}
