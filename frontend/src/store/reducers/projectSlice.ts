import { createSlice } from "@reduxjs/toolkit";

type ContentTypes = {
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
  contents: ContentTypes[];
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
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setContentInProject: (state, action) => {
      state.contents = [...action.payload];
    },
  },
});

export default projectSlice.reducer;
export const { setProject, setContentInProject } = projectSlice.actions;
