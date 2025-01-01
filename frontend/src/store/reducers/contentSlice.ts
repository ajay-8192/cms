import { createSlice } from "@reduxjs/toolkit";

type ContentType = {
    id: string;
    key: string;
    value: any;
    type: string;
};

type ContentSliceTypes = {
    contentId?: string;
    contentName: string;
    content: ContentType[];
};

const initialState: ContentSliceTypes = {
    contentId: "",
    content: [],
    contentName: ""
};

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setContentId: (state, action) => {
            state.contentId = action.payload;
        },
        setContent: (state, action) => {
            state.content = action.payload;
        },
        addContent: (state, action) => {
            state.content.push(action.payload);
        },
        setContentName: (state, action) => {
            state.contentName = action.payload;
        }
    }
});

export default contentSlice.reducer;
export const {
    setContentId,
    setContent,
    addContent,
    setContentName
} = contentSlice.actions;
