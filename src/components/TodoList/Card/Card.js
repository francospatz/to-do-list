// Importing necessary modules and components
import React, { useEffect, useState } from "react";
import DropIndicator from "../DropIndicator";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

// Card component which represents an individual item in a task management or similar system
const Card = ({ title, id, column, handleDragStart, handleDelete, filter }) => {
  const [isChecked, setIsChecked] = useState(false); // State to track if the card is checked off
  const [isHovered, setIsHovered] = useState(false); // State to manage hover effect

  // Effect to load the checked state from local storage when the component mounts
  useEffect(() => {
    const cardsJSON = localStorage.getItem('cards');
    const cards = JSON.parse(cardsJSON); // Parse the stored card data
    cards.find((card) => card.id === id) ? setIsChecked(cards.find((card) => card.id === id).isChecked) : setIsChecked(false); // Set initial check state based on storage
    // eslint-disable-next-line
  }, [])

  // Handle mouse enter events, activating hover state only if the card is not checked
  const handleMouseEnter = () => {
    if (!isChecked) {  // Only change hover state if not checked
      setIsHovered(true);
    }
  };

  // Handle mouse leave events, deactivating hover state
  const handleMouseLeave = () => {
    if (!isChecked) {  // Only change hover state if not checked
      setIsHovered(false);
    }
  };

  // Function to toggle the checked state of the card, updating local storage
  const handleCheck = (e) => {
    const cardsJSON = localStorage.getItem('cards');
    const cards = JSON.parse(cardsJSON);
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, isChecked: !card.isChecked };
      }
      return card;
    });

    localStorage.setItem("cards", JSON.stringify(updatedCards)); // Update stored data
    setIsChecked(!isChecked);
    setIsHovered(false); // Reset hover state after toggle
  };

  // Dynamic CSS class names based on card's check status
  const cardClasses = `cursor-grab rounded border  ${isChecked ? 'bg-transparent line-through text-dark border-plighter' : 'bg-lighter border-dark'} p-3 active:cursor-grabbing h-auto w-full relative transition-colors ease`;

  // Function to control card visibility based on filter settings
  const classFilter = () => {
    if (filter === "all" && isChecked) {
      return "opacity-1"; // Show all tasks regardless of status
    } else if (filter === "progress" && isChecked) {
      return 'hidden opacity-0'; // Hide completed tasks
    } else if (filter === "complete" && !isChecked) {
      return 'hidden opacity-0'; // Hide tasks in progress
    }
  }

  // Component rendering
  return (
    <div className={`transition delay-1000 duration-1000 ease-in  ${classFilter()}`}>
      <DropIndicator beforeId={id} column={column} />  {/* Visual cue for drag-and-drop */}
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })} // Drag start handler
        className={cardClasses}
      >
        <div
          className="w-4 h-4 absolute top-1 left-1 flex justify-center items-center bg-purple rounded cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => handleCheck(e)}
        >
          {(isHovered || isChecked) && <FaCheck className="text-dark w-3 h-3" />} {/* Check icon visibility based on hover/check status */}
        </div>
        {isChecked ?
          <p className="text-sm md:text-md text-darker whitespace-normal break-words p-3 pl-4">{title}</p>
          :
          <p className="text-sm font-bold md:text-md text-darker whitespace-normal break-words p-3 pl-4">{title}</p>}{/* Card title */}


        <RxCross1 className="absolute top-1 right-1 cursor-pointer text-dark transition-colors ease hover:text-darker" onClick={() => handleDelete(id)} />{/* Delete icon */}
      </motion.div>
    </div>
  );
};

// Export the Card component as the default export for this module
export default Card;
