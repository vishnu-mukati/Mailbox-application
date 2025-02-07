import { Fragment, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import Compose from "../compose/Compose";
import Sent from "../sent/SentMail";
import Inbox from "../inbox/Inbox";
import classes from "./Welcome.module.css";  // Import CSS module

const Welcome = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(false);
    const SentMailQunatity = useSelector(state=>state.compose.sent);
    const unreadCount = useSelector((state) => state.compose.unreadCount);
    // const [showPage, setShowPage] = useState(false);
    // const [showList, setShowList] = useState(false);
    // const [showInbox,setShowInbox] = useState(false);

    const logoutHandler = () => {
        dispatch(authActions.logout());
    };

    const togglePageHandler = (page) => {
        // If the same page is clicked again, close it, otherwise open the clicked page
        setCurrentPage((prevPage) => (prevPage === page ? false : page));
    };

//     const toggleComposePageHandler = () => {
//         setShowPage((prevState) => !prevState);
//         if (!showPage) {
//             setShowList(false);
//         }
//     };

//     const toggleSentBoxHandler = () => {
//         setShowList((prevState) => !prevState);
//         if (!showList && !showInbox) {
//             setShowPage(false);
//             setShowInbox(false);
//         }
//     };

//    const toggleInboxHandler = () =>{
//        setShowInbox((prevState)=> !prevState);
//        if (!showList && !showPage) {
//         setShowPage(false);
//         setShowPage(false);
//     }
//    }

    const quantity = SentMailQunatity.length;
    console.log(quantity);

    return (
        <Fragment>
            <div className={classes.container}>
                <div className={classes.header}>
                    <h1>Welcome to the Mailbox</h1>
                    <button onClick={logoutHandler} className={classes.logoutButton}>Logout</button>
                </div>
                <div className={classes.buttonGroup}>
                    <button onClick={() => togglePageHandler('compose')} className={classes.button}>
                        Compose
                    </button>
                    <button onClick={() => togglePageHandler('sent')} className={classes.button}>
                        Sent
                    </button>
                    <button onClick={() => togglePageHandler('inbox')} className={classes.button}>
                        Inbox  {unreadCount > 0 && <span className={classes.unreadBadge}>{unreadCount} unread</span>}
                    </button>
                </div>
                {currentPage === 'compose' && <Compose closeComposePage={() => setCurrentPage(false)} />}
                {currentPage === 'sent' && <Sent closeSentPage={() => setCurrentPage(false)} />}
                {currentPage === 'inbox' && <Inbox closeInboxPage={() => setCurrentPage(false)} />}
            </div>
        </Fragment>
    );
};

export default Welcome;
