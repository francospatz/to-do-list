import React, { useEffect, useState } from "react";

import DropIndicator from "./DropIndicator";
import Card from "./Card";
import AddCard from "./AddCard";
import Filter from "./Filter";

const TodoList = () => {

  const [cards, setCards] = useState(DEFAULT_CARDS);

  // Function to load cards from localStorage
  const loadCards = () => {
    const cardsJSON = localStorage.getItem('cards');
    if (cardsJSON) {
      try {
        const cardsArray = JSON.parse(cardsJSON);
        setCards(cardsArray);
      } catch (error) {
        console.error('Error parsing cards from localStorage:', error);
        // Handle error, maybe clear the localStorage if it's corrupted
        localStorage.removeItem('cards');
      }
    } else {
      localStorage.setItem('cards', JSON.stringify(DEFAULT_CARDS));
    }
  };

  // On mount, load cards from localStorage
  useEffect(loadCards, []);

  return (
    <div className="content min-h-screen w-full bg-gradient-to-b from-purple from-10% via-lighter via-50% to-light to-90%">
      <div className="flex h-auto justify-center gap-3 overflow-scroll p-4 md:p-12 ">
        <Column
          title="To-Do List"
          column="todo"
          headingColor="text-dark"
          cards={cards}
          setCards={setCards}

        />
      </div>
    </div>
  );
};

const Column = ({ title, cards, column, setCards }) => {
  const [active, setActive] = useState(false);
  const [selectedTab, setSelectedTab] = useState('All');
  const [filtered, setFiltered] = useState('All');
  const [cardsShown, setCardsShown] = useState([])

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
      localStorage.setItem("cards", JSON.stringify(copy))
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

    const cardsJSON = localStorage.getItem('cards');
    const oldCards = JSON.parse(cardsJSON);
    const newCards = oldCards.filter((c) => c.id !== cardId);
    localStorage.setItem('cards', JSON.stringify(newCards));
  };

  useEffect(() => {
    const filteredCards = cards.filter((c) => c.column === column);

    if (filtered === "All") {
      setCardsShown(filteredCards.map((c) => {
        return <Card key={c.id} {...c}
          handleDragStart={handleDragStart}
          handleDelete={handleDelete}
          filter={"all"}
          cards={cards}

        />;
      }))
    } else if (filtered === "In progress") {
      setCardsShown(filteredCards.map((c) => {
        return <Card key={c.id} {...c}
          handleDragStart={handleDragStart}
          handleDelete={handleDelete}
          filter={"progress"}
          cards={cards}

        />;
      }))
    } else if (filtered === "Complete") {
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


  const tabs = ["All", "In progress", "Complete"];

  return (
    <div className="w-full md:w-2/3 mt-1 md:mt-2 py-1 md:py-3 px-4 md:px-10 shrink-0">
      <div className="flex items-center justify-between rounded-3xl">
        <h3 className="font-serif text-3xl md:text-4xl text-dark">{title}</h3>
        <span className="rounded text-lg font-bold font-serif text-dark">
          {cards.filter((c) => c.column === column).length}
        </span>

      </div>
      <Filter selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} setFiltered={setFiltered} />
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors rounded ${active ? "bg-lighter/40" : "bg-neutral-800/0"
          }`}
      >
        {cardsShown}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} cards={cards} />
      </div>
    </div>
  );
};

const DEFAULT_CARDS = [
  {
    title: "Order my vinyl record collection",
    id: "1898437",
    column: "todo",

  },
  {
    title: "Write a review about Dune 2 on Letterboxd",
    id: "234244",
    column: "todo",

  },
  {
    title: "Renew WoW Membership",
    id: "33956",
    column: "todo",

  },
  {
    title: "Finish my partner's birthday present",
    id: "4546",
    column: "todo",

  },
  {
    title: "Buy bass guitar strings online",
    id: "531",
    column: "todo",

  }
]


export default TodoList