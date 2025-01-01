import { createSlice } from "@reduxjs/toolkit";

type ContentType = {
    id: string;
    key: string;
    value: any;
    type: string;
};

type ContentSliceTypes = {
    content: ContentType[];
};

const initialState: ContentSliceTypes = {
    content: []
};

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setContent: (_, action) => {
            return { ...action.payload };
        },
        addContent: (state, action) => {
            state.content.push(action.payload);
        },
    }
});

export default contentSlice.reducer;
export const {
    setContent,
    addContent
} = contentSlice.actions;
