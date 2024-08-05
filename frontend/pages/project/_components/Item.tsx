import React from "react";

const Item = ({ project }: { project: object }) => {
  return <div>{JSON.stringify(project)}</div>;
};

export default Item;
