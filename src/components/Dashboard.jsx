import React, { useState } from "react";
import DashHeader from "./DashHeader";
import DashMain from "./DashMain";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--whiteColor)]">
      <DashHeader onToggleNav={() => setNavOpen(!navOpen)} />
      <DashMain
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        navOpen={navOpen}
        closeNav={() => setNavOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
