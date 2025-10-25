import { defaultTabs, extraTabs } from "../utils/contentMap";

const FilterModal = ({ availableTabs, setAvailableTabs, setShowFilter }) => {
  const handleTabFilterChange = (tab, checked) => {
    const updatedTabs = checked
      ? [...availableTabs, tab]
      : availableTabs.filter((t) => t !== tab);
    setAvailableTabs(updatedTabs);
    localStorage.setItem("turtura_tab_filters", JSON.stringify(updatedTabs));
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[var(--alertColor)] p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h5 className="text-md font-semibold mb-4 text-[var(--primaryColor)]">Select Tabs to Display</h5>
        {[...defaultTabs, ...extraTabs].map((tab) => (
          <label key={tab} className="block mb-2 text-[var(--grayColor)]">
            <input
              type="checkbox"
              checked={availableTabs.includes(tab)}
              onChange={(e) => handleTabFilterChange(tab, e.target.checked)}
              className="mr-2"
            />
            {tab}
          </label>
        ))}
        <button
          onClick={() => setShowFilter(false)}
          className="mt-4 px-4 py-2 bg-[var(--accentColor)] text-white rounded-md hover:bg-[var(--primaryColor)] transition-all duration-300 w-full"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
