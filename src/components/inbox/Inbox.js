import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { ComposeAction } from "../../store/ComposeSlice";
import InboxBody from "./InboxBody";
import styles from "./Inbox.module.css";

const Inbox = ({ closeInboxPage }) => {
    const dispatch = useDispatch();
    const [selectedMail, setSelectedMail] = useState(null);
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

            const readEmails = JSON.parse(localStorage.getItem('readEmails')) || [];
            if (response.data) {
                const inboxMails = Object.keys(response.data).map((key) => ({
                    id: key,
                    ...response.data[key],
                    isRead: readEmails.includes(key),
                }));
                dispatch(ComposeAction.inboxEmail(inboxMails));
            } else {
                dispatch(ComposeAction.inboxEmail([]));
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const emailClickHandler = (mail) => {
        setSelectedMail(mail);

        const readEmails = JSON.parse(localStorage.getItem('readEmails')) || [];
        if (!readEmails.includes(mail.id)) {
            readEmails.push(mail.id);
            localStorage.setItem('readEmails', JSON.stringify(readEmails));
        }

        dispatch(ComposeAction.markAsRead(mail.id));
    };

    const goBackHandler = () => {
        setSelectedMail(null);
    };

    async function deleteEmailHandler(id) {
        try {
            const response = await axios.delete(`https://mailbox-compose-email-default-rtdb.firebaseio.com/emails/${userEmail}/inbox/${id}.json`)
            dispatch(ComposeAction.deleteEmail(id));
        } catch (err) {
            alert('unable to delete mail', err.message);
        }
    }

    return (
        <div className={styles.inboxContainer}>
            <div className={styles.header}>
                {selectedMail && (
                    <button className={styles.backButton} onClick={goBackHandler}>
                        ⬅ Back
                    </button>
                )}
                <h1>📥 Inbox</h1>
                <button className={styles.closeButton} onClick={closeInboxPage}>
                    Close
                </button>
            </div>

            {!selectedMail ? (
                <ul className={styles.emailList}>
                    {inboxEmails.length === 0 ? (
                        <p className={styles.noEmails}>No emails found.</p>
                    ) : (
                        inboxEmails.map((email) => (
                            <li
                                key={email.id}
                                onClick={() => emailClickHandler(email)}
                                className={`${styles.emailItem} ${email.isRead ? styles.readEmail : styles.unreadEmail
                                    }`}
                            >
                                <strong>From:</strong> {email.from} <br />
                                <strong>Subject:</strong> {email.subject}
                                <button className={styles.deleteButton} onClick={(e) => {
                                    e.stopPropagation();
                                    deleteEmailHandler(email.id)
                                }}>
                                    Delete
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            ) : (
                <InboxBody mail={selectedMail} />
            )}
        </div>
    );


};

export default Inbox;
