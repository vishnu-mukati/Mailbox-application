import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { ComposeAction } from "../../store/ComposeSlice";
import styles from "./Inbox.module.css"; // Import CSS module

const Inbox = ({ closeInboxPage }) => {
    const dispatch = useDispatch();
    const userEmail = useSelector((state) => state.auth.email);
    const inboxEmails = useSelector((state) => state.compose.inbox);

    useEffect(() => {
        if (userEmail) {
            getData();
        }
    }, [userEmail]);

    async function getData() {
        try {
            const response = await axios.get(`https://mailbox-compose-email-default-rtdb.firebaseio.com/emails/${userEmail}/inbox.json`);
            
            if (response.data) {
                const inboxMails = Object.keys(response.data).map((key) => ({
                    id: key,
                    ...response.data[key],
                }));
                console.log(inboxEmails);
                dispatch(ComposeAction.inboxEmail(inboxMails));
            } else {
                dispatch(ComposeAction.inboxEmail([]));
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className={styles.inboxContainer}>
            <div className={styles.header}>
                <h1>📥 Inbox</h1>
                <button className={styles.closeButton} onClick={closeInboxPage}>
                    Close
                </button>
            </div>

            {inboxEmails.length === 0 ? (
                <p className={styles.noEmails}>No emails found.</p>
            ) : (
                <ul className={styles.emailList}>
                    {inboxEmails.map((email) => (
                        <li key={email.id} className={styles.emailItem}>
                            <strong>From:</strong> {email.from} <br />
                            <strong>Subject:</strong> {email.subject} <br />
                            <strong>Message:</strong> {email.emailBody}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Inbox;
