// Importing React, useState for state management, motion component from framer-motion for animations, and FiPlus icon from react-icons.
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

// AddCard component accepts props for managing cards within a specific column.
const AddCard = ({ column, setCards, cards }) => {
  // State to store the input text and the state of whether we are adding a new card.
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  // Handles the submission of a new card.
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submit behavior.

    if (!text.trim().length) return; // Ignore submission if text is only whitespace.

    // Creating a new card with unique ID and trimming whitespace from title.
    const newCard = {
      title: text.trim(),
      id: Math.random().toString(),
      column
    };

    // Updating the local card list and local storage.
    const updatedCards = [...cards, newCard];
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    setCards((pv) => [...pv, newCard]);
    // Resetting adding state to false to close the form.
    setAdding(false);
  };
  // Rendering the AddCard component which toggles between a button and a form.
  return (
    <div className="pb-8">
      {adding ? (
        // The form shown when adding is true. Includes textarea for input and submit handlers.
        <motion.form layout onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
          setText(''); // Clear text after submitting.
        }
        }>
          <textarea
            onChange={(e) => setText(e.target.value)} // Update text state on change.
            onKeyDown={(e) => {
              // Additional keyboard shortcuts for UX enhancement.
              if (e.key === "Escape") {
                e.preventDefault();
                setAdding(false);
              } else if (e.key === "Enter" && e.target.value === "") {
                e.preventDefault();
                setText('');
                handleSubmit(e);
              } else if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit(e);
                setText('');
              }
            }}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-purple bg-purple p-3 text-sm text-darker placeholder-dark focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            {/* Close and Add buttons for form control */}
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-sm text-darker transition-colors hover:text-dark"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded transition-shadow hover:shadow-neon bg-purple px-3 py-1.5 text-sm text-darker transition-colors hover:bg-purple"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          // Button displayed when not adding a new card; sets 'adding' to true when clicked.
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-sm text-dark transition-colors hover:text-darker"
        >
          <span>Add task</span>
          <FiPlus />
        </motion.button>
      )}
    </div>
  );
};

// Export the AddCard component as the default export for this module.
export default AddCard;
