import { createSlice } from "@reduxjs/toolkit";

const initialComposeState = {
    sent: [],
    inbox: [],
}

const ComposeSlice = createSlice({
    name: "compose email",
    initialState: initialComposeState,
    reducers: {
        sentEmail(state, action) {
            state.sent = action.payload;
        },
        inboxEmail(state,action){
            state.inbox = action.payload;
        }
        
    }
})


export const ComposeAction = ComposeSlice.actions;
export default ComposeSlice.reducer;
