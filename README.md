# Welcome to to-do-list 👋

> Made in React with Tailwindcss and Sass for the styles and Framer-Motion for the animations.
> Add, delete, filter and order by drag & drop all your tasks. 

### ✨ [Live Demo](https://francospatz.github.io/to-do-list)

## Install
1. Clone the repo
```sh
git clone https://github.com/francospatz/to-do-list.git
```
2. Install NPM packages
```sh
npm install
```

## Usage
```sh
npm start
```

## Possible future implementations
- Automatically move tasks that are marked as completed to the bottom of the list.
  
- Button to check or uncheck all tasks.
  
- Button to delete all completed tasks.
  
- Modal notification that allows to undo the last task deletion(s).

## Known issues
- There is a small bug in the animation of the task cards due to the way of displaying them filtered: the framer-motion layout that allows drag & drop animation does not cope well with the change from display-hidden to display-block.
  
- The expected result of unchecking a checkbox is that the hover over the unchecked checkbox, which causes a check to appear, is momentarily disabled. It does not work correctly.
  
- Github Pages has difficulty understanding style preprocessors such as Sass, in particular ‘@apply’, which allows reusing CSS blocks without having to copy them and without having to modify their selectors. For some reason unknown to me, putting a ‘foo: bar’ dummy CSS on the next line of each ‘@apply’ fixes this error and we can deploy the application.

## Author

👤 **Franco Lucas Spatz**

* Github: [@francospatz](https://github.com/francospatz)

## Show your support

Give a ⭐️ if this project helped you!


