import { createSlice } from '@reduxjs/toolkit';

type ProjectSliceTypes = {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    role: string;
    publishedAt: string;
    createdBy: {
        id: string;
        name: string;
    };
    contents: any[];
};

const initialState: ProjectSliceTypes = {
    id: "",
    title: "",
    description: "",
    createdAt: "",
    role: "",
    publishedAt: "",
    createdBy: {
        id: "",
        name: "",
    },
    contents: [],
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProject: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
});

export default projectSlice.reducer;
export const {
    setProject
} = projectSlice.actions;
