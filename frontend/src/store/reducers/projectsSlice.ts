import { createSlice } from "@reduxjs/toolkit";

type ProjectType = {
  createdAt: string;
  createdBy: string;
  description: string;
  id: string;
  publishedAt: string;
  title: string;
  updatedAt: string;
  versionId: number;
  status: "Draft" | "Published" | "Archived"
};

type ProjectListTypes = {
    projects: ProjectType[];
};

const initialState: ProjectListTypes = {
    projects: []
}

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setProjectList: (state, action) => {
            state.projects = [ ...action.payload ]
        },
        removeProject: (state, action) => {
            state.projects = state.projects.filter(project => project.id !== action.payload)
        }
    }
});

export default projectsSlice.reducer;
export const {
    setProjectList,
    removeProject
} = projectsSlice.actions
