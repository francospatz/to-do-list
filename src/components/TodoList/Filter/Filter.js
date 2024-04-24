import React from "react";
import { motion } from "framer-motion";



const Filter = ({ selectedTab, setSelectedTab, tabs }) => {

  return (
    <div className="py-2 flex items-center flex-wrap gap-2">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selectedTab={selectedTab === tab}
          setSelectedTab={setSelectedTab}
          key={tab}
        />
      ))}
    </div>
  );
};

const Chip = ({ text, selectedTab, setSelectedTab }) => {

  return (
    <button
      onClick={() => {
        setSelectedTab(text)
      }
      }
      className={`${selectedTab
        ? "text-white"
        : "text-neutral-400 hover:text-slate-200 hover:bg-violet-400/20"
        } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selectedTab && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

export default Filter;
