import { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import Inbox from "../inbox/Inbox";

const Welcome = () =>{

    const dispatch = useDispatch();
    const [showInbox,setShowInbox] = useState(false);

    const logoutHandler = () =>{
        dispatch(authActions.logout());
    }

    const toggleInboxHandler = () =>{
        setShowInbox((prevState)=>!prevState);
    }

    return (
        <Fragment>
        <h1>Welcome to the email </h1>
        <button onClick={logoutHandler}>logout</button>
        <button onClick={toggleInboxHandler}>
        {showInbox ? "Hide Inbox" : "Show Inbox"}
        </button>
        {showInbox && <Inbox />}
        </Fragment>
    );
}

export default Welcome;