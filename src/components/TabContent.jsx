const TabContent = ({ activeTab, contentMap }) => {
  return (
    <div className="mt-4 text-[var(--textColor)] text-justify">
      {contentMap[activeTab] || "No content available for this topic."}
    </div>
  );
};

export default TabContent;
