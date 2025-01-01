import { createSlice } from "@reduxjs/toolkit";

type UserSliceTypes = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    isLoggedIn: boolean;
    [key: string]: any;
};

const initialState: UserSliceTypes = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    isLoggedIn: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (_, action) => {
            return {
                ...action.payload,
                isLoggedIn: true
            }
        }
    }
});

export default userSlice.reducer;
export const {
    setUserDetails
} = userSlice.actions;
