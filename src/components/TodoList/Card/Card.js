import React, { useEffect, useState } from "react";
import DropIndicator from "../DropIndicator";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const Card = ({ title, id, column, handleDragStart, handleDelete, checked, setChecked, ck }) => {
  const [isChecked, setIsChecked] = useState(ck);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isChecked) {
      const found = checked.find(c => c.id === id)
      if (!found) {
        setChecked([...checked, { id, title, column, isChecked }])
      }
    }
    if (!isChecked) {
      const newChecked = checked.filter(c => c.id !== id)
      setChecked(newChecked)
    }
  }, [isChecked])


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
    setIsChecked(!isChecked);
    setIsHovered(false); // Optionally reset hover when clicked
  };

  const cardClasses = `cursor-grab rounded border border-neutral-700 ${isChecked ? 'bg-neutral-500 line-through' : 'bg-neutral-800'} p-3 active:cursor-grabbing h-auto w-full relative`;

  return (
    <>
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
          {(isHovered || isChecked) && <FaCheck className="text-green transition-opacity ease w-3 h-3" />}
        </div>
        <p className="text-sm text-neutral-100 whitespace-normal break-words p-3 pl-4">{title}</p>

        <RxCross1 className="absolute top-1 right-1 cursor-pointer transition-colors ease hover:text-red" onClick={() => handleDelete(id)} />
      </motion.div>
    </>
  );
};

export default Card;
