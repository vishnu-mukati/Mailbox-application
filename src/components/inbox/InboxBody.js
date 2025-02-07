import styles from "./Inbox.module.css";

const InboxBody = ({ mail }) => {
    return (
        <div className={styles.inboxBody}>
            <p><strong>From:</strong> {mail.from}</p>
            <p><strong>Body:</strong></p>
            <p>{mail.emailBody}</p>
        </div>
    );
};

export default InboxBody;
