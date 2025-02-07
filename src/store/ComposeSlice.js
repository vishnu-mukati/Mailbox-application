import { createSlice } from "@reduxjs/toolkit";

const initialComposeState = {
    sent: [],
    inbox: [],
    unreadCount: 0, 
};

const ComposeSlice = createSlice({
    name: "compose email",
    initialState: initialComposeState,
    reducers: {
        sentEmail(state, action) {
            state.sent = action.payload;
        },
        inboxEmail(state, action) {
            state.inbox = action.payload;

          
            state.unreadCount = action.payload.filter(email => !email.isRead).length;
        },
        markAsRead(state, action) {
            const emailId = action.payload;

            const email = state.inbox.find(mail => mail.id === emailId);
            if (email && !email.isRead) {
                email.isRead = true;
                state.unreadCount -= 1; 
            }
        }
    }
});

export const ComposeAction = ComposeSlice.actions;
export default ComposeSlice.reducer;
