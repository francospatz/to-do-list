import React, { useEffect, useState } from "react";

import Column from "./Column";

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