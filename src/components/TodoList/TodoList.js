import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Column from "./Column";

// Component to render a To-Do list interface
const TodoList = () => {

  // State to store the list of cards (tasks)
  const [cards, setCards] = useState(DEFAULT_CARDS);

  // Load cards from localStorage or initialize with default cards
  const loadCards = () => {
    const cardsJSON = localStorage.getItem('cards');
    if (cardsJSON) {
      try {
        const cardsArray = JSON.parse(cardsJSON);
        setCards(cardsArray);
      } catch (error) {
        console.error('Error parsing cards from localStorage:', error);
        // Clear localStorage if JSON parsing fails
        localStorage.removeItem('cards');
      }
    } else {
      // Set default cards in localStorage if none exist
      localStorage.setItem('cards', JSON.stringify(DEFAULT_CARDS));
    }
  };

  // Effect hook to load cards on component mount
  useEffect(loadCards, []);

  return (
    <div className="content min-h-screen h-full w-full bg-gradient-to-b from-purple from-10% via-lighter via-50% to-light to-90%">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        className=" z-1 background-image overflow-hidden sm:w-[600px] sm:h-[600px] lg:w-[900px] lg:h-[900px]"></motion.div>
      <div className="flex h-full justify-center gap-3 p-4 pb-12 p-0 md:p-12 relative z-2">
        {/* Column component to display the cards with props for interaction and styling */}
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

// Default set of cards to initialize the To-Do list
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