import { createSlice } from "@reduxjs/toolkit";

export type ContentType = {
    createdAt: string;
    createdUser: string;
    data: { [key: string]: any };
    id: string;
    lastModifiedUser: string;
    name: string;
    projectId: string;
    status: "Draft" | "Published" | "Archived";
    updatedAt: string;
    versionId: number;
    _id: number;
};

type ContentSliceTypes = {
    contentId?: string;
    contentName: string;
    content: ContentType[];
    selectedContent?: ContentType;
};

const initialState: ContentSliceTypes = {
    contentId: "",
    content: [],
    contentName: "",
    selectedContent: undefined
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
        },
        setSelectedContent: (state, action) => {
            state.selectedContent = action.payload;
        }
    }
});

export default contentSlice.reducer;
export const {
    setContentId,
    setContent,
    addContent,
    setContentName,
    setSelectedContent
} = contentSlice.actions;
