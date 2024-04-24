import React from "react";
import { motion } from "framer-motion";

const Filter = ({ selectedTab, setSelectedTab, tabs, setFiltered }) => {

  return (
    <div className="py-2 flex items-center flex-wrap gap-2">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selectedTab={selectedTab === tab}
          setSelectedTab={setSelectedTab}
          key={tab}
          setFiltered={setFiltered}
        />
      ))}
    </div>
  );
};

const Chip = ({ text, selectedTab, setSelectedTab, setFiltered }) => {

  return (
    <button
      onClick={() => {
        setSelectedTab(text)
        setFiltered(text)
      }
      }
      className={`${selectedTab
        ? "text-darker pointer-events-none"
        : "text-dark hover:text-darker hover:bg-purple hover:shadow-neon2"
        } text-md font-bold transition-all px-2.5 py-0.5 rounded-md relative `}
    >
      <span className="relative z-10">{text}</span>
      {selectedTab && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-lighter to-light rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

export default Filter;
