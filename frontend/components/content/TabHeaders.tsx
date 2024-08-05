import { PROJECT_TABS } from "@/constants/ProjectTabHeaders";
import React from "react";

type TabHeadersProps = {
  selectedTab: "content" | "settings";
  toggleTab: () => void;
};

const TabHeaders: React.FC<TabHeadersProps> = ({
  selectedTab = "content",
  toggleTab,
}) => {
  return (
    <div className="flex items-center w-full text-center border-b-2 h-12">
      {PROJECT_TABS.map((tab) => {
        const handleClick = (e: any) => {
          if (tab.key !== selectedTab) toggleTab();
        };
        const isSelected = tab.key === selectedTab;
        return (
          <div
            key={tab.id}
            onClick={handleClick}
            className={`w-1/2 h-full content-center first:border-r-2 border-b-4 cursor-pointer ${isSelected ? "border-b-primary" : "border-b-white"}`}
          >
            {tab.name}
          </div>
        );
      })}
    </div>
  );
};

export default TabHeaders;
