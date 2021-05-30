// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
// import "./styles/keysmodal.scss"
// import FormButton from "../../components/formReusable/FormButton";


// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1)
//     }
//   }
// }));

// export default function KeysModel() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//                   <Popup
//                       trigger={
//                             <FormButton
//                                 type={"submit"}
//                                 loading={loading}
//                                 color={"btn-primary"}
//                                 btnText={"Sign up"}
//                             />
//                         }
//                       modal
//                       nested
//                     >
//                     {(close) => (
//                             <div className="share-modal">

//                               <button className="close" onClick={close}>
//                                 &times;
//                               </button>
//                               <div className="header"> Your Keys for sharing tickets with friends </div>
//                               <div className="content">
//                                 <span>The Public Key</span>
//                                 <input type="email" id="email" name="email" />
//                               </div>
//                               <div className="content">
//                                 <span>The Private Key</span>
//                                 <input type="password" id="passowrd" name="password" />
//                                 <span class="text-danger">Please Store the keys in a secure and accessible location.</span>
//                                 <span class="text-danger">Share with friends only your public key for reciving tickes.</span>
//                               </div>
//                               <div className="actions">
//                                 <button
//                                   className="btn btn-outline-secondary round-btn"
//                                   onClick={() => {
//                                     console.log("Send Ticket");
//                                   }}
//                                 >
//                                   OK
//                                 </button>

//                               </div>


//                             </div>
//                     )}



                    
//                   </Popup>
//     </div>
//   );
// }
