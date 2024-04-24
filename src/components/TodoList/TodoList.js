import React, { useState } from "react";

import DropIndicator from "./DropIndicator";
import Card from "./Card";
import AddCard from "./AddCard";
import Filter from "./Filter";


const TodoList = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  const [checked, setChecked] = useState([]);




  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <div className="flex justify-center h-full gap-3 overflow-scroll p-12">
        <Column
          title="TODO"
          column="todo"
          headingColor="text-violet-600"
          cards={cards}
          setCards={setCards}
          checked={checked}
          setChecked={setChecked}
        />
      </div>
    </div>
  );
};

const Column = ({ title, cards, column, setCards, checked, setChecked }) => {
  const [active, setActive] = useState(false);
  const [selectedTab, setSelectedTab] = useState('All')

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

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

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const handleDelete = (id) => {
    const cardId = id;
    setCards((pv) => pv.filter((c) => c.id !== cardId));
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);
  const completedCards = checked.filter((c) => c.column === column);
  const progressCards = filteredCards.filter(c1 => !completedCards.some(c2 => c2.id === c1.id));

  const tabs = ["All", "In progress", "Complete"];

  return (
    <div className="w-60 md:w-1/3 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif font-thin text-white">{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>

      </div>
      <Filter selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} />
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"
          }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c}
            handleDragStart={handleDragStart}
            handleDelete={handleDelete}
            checked={checked}
            setChecked={setChecked}
          />;
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

const DEFAULT_CARDS = [
  {
    title: "Restock the Oddities Collection",
    id: "1",
    column: "todo",
  },
  {
    title: "Write a review about Dune 2 on Letterboxd",
    id: "2",
    column: "todo"
  },
  {
    title: "Renew WoW Membership",
    id: "3",
    column: "todo"
  },
  {
    title: "Start preparing my partner's birthday present",
    id: "4",
    column: "todo"
  },
  {
    title: "Prepare the guest room",
    id: "5",
    column: "todo"
  }
]


export default TodoList