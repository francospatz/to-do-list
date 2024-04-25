// Importing necessary React modules and component dependencies
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../Card";
import Filter from "../Filter";
import AddCard from "../AddCard";
import DropIndicator from "../DropIndicator";

// The Column component manages a collection of cards, handling their interactions and display.
const Column = ({ title, cards, column, setCards }) => {
  const [active, setActive] = useState(false); // State to manage if the column is active during a drag operation
  const [selectedTab, setSelectedTab] = useState('All'); // State for the currently selected filter tab
  const [filtered, setFiltered] = useState('All'); // State for the applied filter type
  const [cardsShown, setCardsShown] = useState([]); // State to store the currently displayed cards based on the filter

  // Handles the beginning of a drag operation, setting up the data transfer
  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  // Handles the drop event in the column, updating the cards based on the drop location
  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false); // Deactivate column highlighting
    clearHighlights(); // Clear any visual indicators for drop locations

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1"; // Get the identifier for the position to drop the card

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1"; // If dropping at the end

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
      localStorage.setItem("cards", JSON.stringify(copy))
    }
  };

  // Handles the drag over event to display a highlight at potential drop locations
  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  // Clear all highlight effects from drop indicators
  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  // Apply highlight effects to the closest drop indicator
  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  // Find the nearest indicator to the cursor during a drag event
  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50; // Offset to fine-tune the proximity calculations
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  // Retrieves all drop indicators within the column
  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  // Reset highlights and deactivate the column when dragging leaves its area
  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  // Handle the deletion of a card
  const handleDelete = (id) => {
    const cardId = id;
    setCards((pv) => pv.filter((c) => c.id !== cardId));
    setActive(false);

    const cardsJSON = localStorage.getItem('cards');
    const oldCards = JSON.parse(cardsJSON);
    const newCards = oldCards.filter((c) => c.id !== cardId);
    localStorage.setItem('cards', JSON.stringify(newCards));
  };

  // Effect hook to filter and display cards based on the selected tab
  useEffect(() => {
    const filteredCards = cards.filter((c) => c.column === column);

    if (filtered === "All") { // If the selected tab is "All", display all cards
      setCardsShown(filteredCards.map((c) => {
        return <Card key={c.id} {...c}
          handleDragStart={handleDragStart}
          handleDelete={handleDelete}
          filter={"all"}
          cards={cards}

        />;
      }))
    } else if (filtered === "In progress") { // If the selected tab is "In progress", display cards with "progress" status
      setCardsShown(filteredCards.map((c) => {
        return <Card key={c.id} {...c}
          handleDragStart={handleDragStart}
          handleDelete={handleDelete}
          filter={"progress"}
          cards={cards}

        />;
      }))
    } else if (filtered === "Complete") { // If the selected tab is "Complete", display cards with "complete" status
      setCardsShown(filteredCards.map((c) => {
        return <Card key={c.id} {...c}
          handleDragStart={handleDragStart}
          handleDelete={handleDelete}
          filter={"complete"}
          cards={cards}
        />;
      }))
    }
    // eslint-disable-next-line
  }, [filtered, cards, column]);

  //Filter tabs
  const tabs = ["All", "In progress", "Complete"];

  // Component rendering
  return (
    <div className="w-full md:w-2/3 mt-1 md:mt-2 py-1 md:py-3 px-4 md:px-10 shrink-0 bg-gradient-to-b from-purple from-50% to-lighter to-90% rounded rounded-2xl">
      <div className="flex items-center justify-between rounded-3xl">
        <motion.h3
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 1.6,
              delay: 0.6,
            },
          }}
          className="font-serif text-3xl md:text-4xl text-dark">
          {title}
        </motion.h3>
        <motion.span
          initial={{
            opacity: 0,
            x: 10,
          }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1.6,
              delay: 1.5,
            },
          }}
          className="rounded text-lg font-bold font-serif text-dark">
          {cards.filter((c) => c.column === column).length}
        </motion.span>

      </div>
      <Filter selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} setFiltered={setFiltered} />
      <motion.div
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 1.6,
            delay: 1.2,
          },
        }}
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors rounded`}
      >
        {cardsShown} {/* Prints all task cards */}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} cards={cards} />
      </motion.div>
    </div>
  );
};

// Export the Column component as the default export
export default Column;