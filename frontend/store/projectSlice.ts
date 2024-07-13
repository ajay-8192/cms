import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
  projectList: object[],
  selectedProject: string | null
};

const initialState: ProjectState = {
  projectList: [],
  selectedProject: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setAllProject: (state, action: PayloadAction<object[]>) => {
      state.projectList = [ ...action.payload ];
    },
    setSelectedProject: (state, action: PayloadAction<string>) => {
      state.selectedProject = action.payload;
    }
  }
});

export const {} = projectSlice.actions;

export default projectSlice.reducer;
