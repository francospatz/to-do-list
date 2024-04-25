import React, { useState, useEffect } from "react";
import Card from "../Card";
import Filter from "../Filter";
import AddCard from "../AddCard";
import DropIndicator from "../DropIndicator";

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

export default Column;
