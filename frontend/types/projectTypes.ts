export type CreateProject = {
  name: string;
  description: string;
};

export interface SelectedProjectType {
  name: string;
  description: string;
  [key: string]: any;
}

export interface ProjectType {
  _id: string;
  name: string;
  description: string;
  owner: string;
  modifiedAt: string;
  [key: string]: any;
}
