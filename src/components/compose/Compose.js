import { Fragment, useState } from "react";
import classes from "./Compose.module.css";
import { Trash2 } from 'lucide-react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ComposeAction } from "../../store/ComposeSlice";

const Inbox = ({ closeComposePage }) => {
   const dispatch = useDispatch();

   const userEmail = useSelector(state => state.auth.email);

   const [email, setEmail] = useState("");
   const [subject, setSubject] = useState("");
   const [emailBody, setEmailBody] = useState("");

   async function composeMailHandler(event) {
      event.preventDefault();

      if (!email || !subject || !emailBody) {
         alert("All fields are required!");
         return;
      }

      const emailData = {
         to: email,
         subject,
         emailBody,
         date: new Date().toLocaleString(),
         from : userEmail,
      }

      try {
         const response = await axios.post(`https://mailbox-compose-email-default-rtdb.firebaseio.com/emails/${userEmail}/sent.json`, emailData)

         await axios.post(`https://mailbox-compose-email-default-rtdb.firebaseio.com/emails/${email.replace(/[@.]/g, "_")}/inbox.json`, emailData)
      } catch (err) {
         alert(err.message);
      }


      alert("Email sent successfully!");
      setEmail("");
      setSubject("");
      setEmailBody("");


   };

   const descartcomposeHandler = () => {
      setEmail("");
      setSubject("");
      setEmailBody("");
   }

   return (
      <Fragment>
         <form onSubmit={composeMailHandler} className={classes.emailForm}>
            <button type="button" onClick={closeComposePage} className={classes.deleteBtn}>
               X
            </button>
            <div className={classes.header}>
               <input
                  type="email"
                  placeholder="To"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={classes.inputField}
               />
            </div>

            <input
               type="text"
               placeholder="Subject"
               value={subject}
               onChange={(e) => setSubject(e.target.value)}
               className={`${classes.inputField} ${classes.subjectField}`}
            />

            <textarea
               value={emailBody}
               onChange={(e) => setEmailBody(e.target.value)}
               placeholder="Write your message..."
               className={classes.textarea}
            />

            <div className={classes.buttonGroup}>
               <button type="submit" className={classes.sendBtn}>Send</button>
               <button type="reset" onClick={descartcomposeHandler} className={classes.discardBtn}><Trash2 size={20} /></button>
            </div>
         </form>
      </Fragment>
   );
};

export default Inbox;
