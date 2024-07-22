import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedProjectType {
  name: string;
  description: string;
  [key: string]: any;
};

interface ProjectState {
  projectList: object[];
  recentProjects: object[];
  projectDetails: object[];
  selectedProject: SelectedProjectType
}

const initialState: ProjectState = {
  projectList: [],
  recentProjects: [],
  projectDetails: [],
  selectedProject: {
    name: '',
    description: ''
  },
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setAllProject: (state, action: PayloadAction<object[]>) => {
      state.projectList = [...action.payload];
    },
    setSelectedProject: (state, action: PayloadAction<SelectedProjectType>) => {
      state.selectedProject = action.payload;
    },
    setRecentProjects: (state, action: PayloadAction<object[]>) => {
      state.recentProjects = action.payload;
    },
  },
});

export const { setSelectedProject, setRecentProjects, setAllProject } = projectSlice.actions;

export default projectSlice.reducer;
