import React, { useEffect, useState } from "react";
import DropIndicator from "../DropIndicator";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const Card = ({ title, id, column, handleDragStart, handleDelete, filter }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cardsJSON = localStorage.getItem('cards');
    const cards = JSON.parse(cardsJSON);
    cards.find((card) => card.id === id) ? setIsChecked(cards.find((card) => card.id === id).isChecked) : setIsChecked(false);
  }, [])

  const handleMouseEnter = () => {
    if (!isChecked) {  // Only change hover state if not checked
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isChecked) {  // Only change hover state if not checked
      setIsHovered(false);
    }
  };

  const handleCheck = (e) => {
    const cardsJSON = localStorage.getItem('cards');
    const cards = JSON.parse(cardsJSON);
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, isChecked: !card.isChecked };
      }
      return card;
    });
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    setIsChecked(!isChecked);
    setIsHovered(false); // Optionally reset hover when clicked
  };

  const cardClasses = `cursor-grab rounded border border-neutral-700 ${isChecked ? 'bg-lighter line-through text-dark' : 'bg-light'} p-3 active:cursor-grabbing h-auto w-full relative transition-colors ease`;

  const classFilter = () => {
    if (filter === "all" && isChecked) {
      return
    } else if (filter === "progress" && isChecked) {
      return 'hidden opacity-0'
    } else if (filter === "complete" && !isChecked) {
      return 'hidden opacity-0'
    }
  }

  return (
    <div className={classFilter()}>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className={cardClasses}
      >
        <div
          className="w-4 h-4 absolute top-1 left-1 flex justify-center items-center bg-white rounded cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => handleCheck(e)}
        >
          {(isHovered || isChecked) && <FaCheck className="text-indigo-600 transition-opacity ease w-3 h-3" />}
        </div>
        <p className="text-sm text-darker whitespace-normal break-words p-3 pl-4">{title}</p>

        <RxCross1 className="absolute top-1 right-1 cursor-pointer transition-colors ease hover:text-red" onClick={() => handleDelete(id)} />
      </motion.div>
    </div>
  );
};

export default Card;
