// Importing React and the motion component from framer-motion for animations.
import React from "react";
import { motion } from "framer-motion";

// Filter component for handling tab selection and content filtering.
// Accepts selectedTab, setSelectedTab, tabs list, and setFiltered function as props.
const Filter = ({ selectedTab, setSelectedTab, tabs, setFiltered }) => {
  // Render a div that displays each tab as a Chip component.
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -100,
      }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 1.6,
          delay: 1.2,
        },
      }}
      className="py-2 flex items-center flex-wrap gap-2">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selectedTab={selectedTab === tab}
          setSelectedTab={setSelectedTab}
          key={tab}
          setFiltered={setFiltered}
        />
      ))}
    </motion.div>
  );
};

// Chip component that represents an individual tab.
// Accepts text, selectedTab status, setSelectedTab, and setFiltered functions as props.
const Chip = ({ text, selectedTab, setSelectedTab, setFiltered }) => {
  // Render a button with dynamic class names based on the selected status.
  // Handles tab selection and filtering on click.
  return (
    <button
      onClick={() => {
        setSelectedTab(text) // Sets the currently selected tab
        setFiltered(text) // Filters content based on the selected tab
      }
      }
      className={`${selectedTab
        ? "text-darker pointer-events-none"
        : "text-dark hover:text-darker hover:bg-purple hover:shadow-neon"
        } text-md font-bold transition-all px-2.5 py-0.5 rounded-md relative `}
    >
      <span className="relative z-10">{text}</span> {/* The visible text of the tab */}

      {/* Conditional rendering for a motion span if the tab is selected */}
      {selectedTab && (
        <motion.span
          layoutId="pill-tab" // Unique ID for motion animation
          transition={{ type: "spring", duration: 0.5 }} // Animation type and duration
          className="gradient-background  absolute inset-0 z-0 rounded-md"
        ></motion.span>
      )}
    </button>
  );
};
// Default export of the Filter component for use in other parts of the application.
export default Filter;
