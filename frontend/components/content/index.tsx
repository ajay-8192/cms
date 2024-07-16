import React, { useState } from "react";
import TabHeaders from "./TabHeaders";
import ProjectContent from "./ProjectContent";
import ProjectSettings from "./ProjectSettings";

const Content = () => {
  const [selectedTab, setSelectedTab] = useState<"content" | "settings">(
    "content",
  );

  const handleSelectedTab = () => {
    if (selectedTab === "content") {
      setSelectedTab("settings");
    } else {
      setSelectedTab("content");
    }
  };

  return (
    <>
      <TabHeaders selectedTab={selectedTab} toggleTab={handleSelectedTab} />
      {selectedTab === "content" ? <ProjectContent /> : <ProjectSettings />}
    </>
  );
};

export default Content;
