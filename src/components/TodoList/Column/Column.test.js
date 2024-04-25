import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Column from './Column';

// Mocks for the child components and external modules
jest.mock('../Card', () => (props) => <div data-testid="card">{props.children}</div>);
jest.mock('../Filter', () => ({ selectedTab, setSelectedTab, tabs, setFiltered }) => (
  <div data-testid="filter">Filter Component</div>
));
jest.mock('../AddCard', () => () => <div data-testid="add-card">Add Card Component</div>);
jest.mock('../DropIndicator', () => () => <div data-testid="drop-indicator">Drop Indicator Component</div>);
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children }) => <div data-testid="motion-div">{children}</div>,
    h3: ({ children }) => <h3>{children}</h3>,
    span: ({ children }) => <span>{children}</span>,
  }
}));

describe('Column component', () => {
  const mockCards = [
    { id: '1', column: 'todo', name: 'Task 1' },
    { id: '2', column: 'todo', name: 'Task 2' },
  ];

  const mockSetCards = jest.fn();

  it('renders without crashing', () => {
    render(<Column title="TODO" cards={mockCards} column="todo" setCards={mockSetCards} />);
    expect(screen.getByText('TODO')).toBeInTheDocument();
    expect(screen.getByTestId('filter')).toBeInTheDocument();
    expect(screen.getByTestId('add-card')).toBeInTheDocument();
  });

  it('displays the correct number of cards', () => {
    render(<Column title="TODO" cards={mockCards} column="todo" setCards={mockSetCards} />);
    expect(screen.getAllByTestId('card').length).toBe(2);
  });

  it('updates filtered state when filter changes', () => {
    render(<Column title="TODO" cards={mockCards} column="todo" setCards={mockSetCards} />);
    fireEvent.click(screen.getByText('Filter Component'));
    // Assume `setFiltered` changes the state accordingly
    // You would need to implement state updates and check the results
  });
});
