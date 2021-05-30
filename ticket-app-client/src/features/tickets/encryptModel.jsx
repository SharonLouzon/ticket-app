import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../styles/sharemodal.scss";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default function IconButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Popup
        trigger={
            <>
                {/* <Link
                    className="btn btn-link btn-style"
                    to={{ pathname: `/ticket/share` }}
                >
                <i className="fas fa-user-friends card-text fa-3x text-primary" />
                </Link>

                <Link
                    className="btn btn-link btn-style"
                    to={{ pathname: `/ticket/share` }}
                >
                    <i className="fas fa-lock card-text fa-3x text-primary" />
                </Link> */}
            </>
        }
        modal
        nested
      >
        {(close) => (
          <div className="share-modal">

            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> Send Ticket by Email </div>
            <div className="content">
              <span>Please enter the email</span>
              <input type="email" id="email" name="email" />
            </div>
            <div className="content">
              <span>Please enter public key</span>
              <input type="password" id="passowrd" name="password" />
            </div>
            <div className="actions">
              <button
                className="btn btn-outline-secondary round-btn"
                onClick={() => {
                  console.log("Send Ticket");
                }}
              >
                Send Ticket
              </button>

            </div>


          </div>
        )}
      </Popup>
    </div>
  );
}
