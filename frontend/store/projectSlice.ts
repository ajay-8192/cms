import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectState {
  projectList: object[];
  recentProjects: object[];
  projectDetails: object[];
  selectedProject: string | null;
}

const initialState: ProjectState = {
  projectList: [],
  recentProjects: [],
  projectDetails: [],
  selectedProject: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setAllProject: (state, action: PayloadAction<object[]>) => {
      state.projectList = [...action.payload];
    },
    setSelectedProject: (state, action: PayloadAction<string>) => {
      state.selectedProject = action.payload;
    },
    setRecentProjects: (state, action: PayloadAction<object[]>) => {
      state.recentProjects = action.payload;
    },
  },
});

export const {} = projectSlice.actions;

export default projectSlice.reducer;
