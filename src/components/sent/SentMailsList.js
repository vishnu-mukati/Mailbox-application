import React from "react";
import classes from "./SentMail.module.css"; // Import the CSS module

const SentMailsList = ({ mail }) => {
    return (
        <div className={classes.sentMailContainer}>
            <div className={classes.emailBody}>
                <p><strong>To:</strong> {mail.to}</p>
                <p><strong>Body:</strong></p>
                <p>{mail.emailBody}</p> {/* Assuming your email object contains a `body` field */}
            </div>
        </div>
    );
};

export default SentMailsList;
