import React from "react";
import Dashnav from "./Dashnav";
import DashAside from "./DashAside";
import MainContent from "./MainContent";

const DashMain = ({ isCollapsed, toggleCollapse, navOpen }) => {
  const navWidth = isCollapsed ? 80 : 256;

  return (
    <main className="flex pt-20 h-[calc(100vh-80px)] overflow-hidden">
      {/* Sidebar Navigation */}
      <div className={`transition-all duration-500 ease-in-out md:${navOpen ? "block" : "hidden"} lg:block`} style={{ width: `${navWidth}px` }}>
        <Dashnav isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
      </div>

      {/* Main + Aside scroll together */}
      <div className="flex-grow overflow-y-auto px-6 md:px-10 flex gap-6">
  <div className="flex-1">
    <MainContent />
  </div>
  <div className="hidden lg:block w-[350px]">
    <div className="sticky top-20">
      <DashAside />
    </div>
  </div>
</div>

    </main>
  );
};

export default DashMain;
