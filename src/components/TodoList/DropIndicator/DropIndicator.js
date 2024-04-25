// Importing React library.
import React from "react";

// DropIndicator component displays a visual cue for drop locations in a drag-and-drop interface.
// It accepts beforeId and column as props to specify its position and association.
const DropIndicator = ({ beforeId, column }) => {

  // Renders a div that serves as a drop indicator in the UI.
  // Uses conditional data attributes to manage its display logic and positioning.
  return (
    <div
      data-before={beforeId || "-1"} // Uses beforeId to mark where the dragged item will be placed, defaults to "-1" if not specified.
      data-column={column} // Indicates the column in which this indicator is active.
      className="my-0.5 h-0.5 w-full bg-dark opacity-0" // Styling for the indicator: barely visible until active.
    />
  );
};

// Exports DropIndicator as the default export of this module, allowing it to be imported and used elsewhere.
export default DropIndicator;
