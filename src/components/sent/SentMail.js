import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ComposeAction } from "../../store/ComposeSlice";
import classes from "./SentMail.module.css"; // Import the CSS module
import SentMailsList from "./SentMailsList"; // Import the SentMailsList component

const SentMail = ({ closeSentPage }) => {
    const dispatch = useDispatch();
    const userEmail = useSelector(state => state.auth.email);
    const usersentData = useSelector(state => state.compose.sent);
    const [selectedMail, setSelectedMail] = useState(null); // State to store the selected email

    useEffect(() => {
        getSentMailData();
    }, []);

    async function getSentMailData() {
        try {
            const response = await axios.get(`https://mailbox-compose-email-default-rtdb.firebaseio.com/emails/${userEmail}/sent.json`);
            if (response.data) {
                const sentMails = Object.keys(response.data).map(key => ({
                    id: key,
                    ...response.data[key]
                }));

                dispatch(ComposeAction.sentEmail(sentMails)); 
            } else {
                dispatch(ComposeAction.sentEmail([])); 
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleEmailClick = (mail) => {
        setSelectedMail(mail); // Set the selected mail to show its body
    };

    return (
        <Fragment>
            <div className={classes.sentContainer}>
                <h1 className={classes.sentTitle}>Sent Emails</h1>
                {!selectedMail ? (
                    <ul className={classes.sentList}>
                        {usersentData.length === 0 ? (
                            <li>No Sent Emails Found.</li>
                        ) : (
                            usersentData.map((mail) => (
                                <li key={mail.id} onClick={() => handleEmailClick(mail)} className={classes.sentListItem}>
                                    <strong>To:</strong> {mail.to}
                                    <span className={classes.subjectData}>{mail.subject}</span>
                                    <hr />
                                </li>
                            ))
                        )}
                    </ul>
                ) : (
                    <SentMailsList mail={selectedMail} />
                )}
                <button onClick={closeSentPage} className={classes.closeButton}>Close</button>
            </div>
        </Fragment>
    );
};

export default SentMail;
