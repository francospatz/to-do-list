import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

const AddCard = ({ column, setCards, cards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      title: text.trim(),
      id: Math.random().toString(),
      column
    };

    const updatedCards = [...cards, newCard];

    localStorage.setItem("cards", JSON.stringify(updatedCards));
    setCards((pv) => [...pv, newCard]);

    setAdding(false);
  };

  return (
    <div className="pb-8">
      {adding ? (
        <motion.form layout onSubmit={
          (e) => {
            e.preventDefault();
            handleSubmit(e);
            setText('');
          }
        }>
          <textarea
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
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

export default AddCard;
