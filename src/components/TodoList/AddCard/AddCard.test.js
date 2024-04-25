import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddCard from './AddCard';

describe('AddCard Component', () => {
  const mockCards = [{ title: 'Existing Task', id: '1', column: 'todo' }];
  const mockSetCards = jest.fn();

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Setup a more complete and isolated mock for localStorage
    let store = {};
    global.localStorage = {
      getItem: jest.fn((key) => store[key] || null),
      setItem: jest.fn((key, value) => {
        store[key] = String(value);
      }),
      clear: jest.fn(() => {
        store = {};
      }),
      removeItem: jest.fn((key) => {
        delete store[key];
      })
    };
  });

  test('renders add button initially', () => {
    render(<AddCard column="todo" cards={mockCards} setCards={mockSetCards} />);
    const addButton = screen.getByRole('button', { name: /add task/i });
    expect(addButton).toBeInTheDocument();
  });

  test('toggles to show input form when add button is clicked', () => {
    render(<AddCard column="todo" cards={mockCards} setCards={mockSetCards} />);
    fireEvent.click(screen.getByText(/add task/i));
    expect(screen.getByPlaceholderText(/add new task/i)).toBeInTheDocument();
  });

  test('closes form when Close button is clicked', async () => {
    render(<AddCard column="todo" cards={mockCards} setCards={mockSetCards} />);
    fireEvent.click(screen.getByText(/add task/i));
    fireEvent.click(screen.getByText(/close/i));
    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/add new task/i)).not.toBeInTheDocument();
    });
  });

  test('does not add a new card if the input is empty', () => {
    render(<AddCard column="todo" cards={mockCards} setCards={mockSetCards} />);
    fireEvent.click(screen.getByText(/add task/i));
    const input = screen.getByPlaceholderText('Add new task...');
    fireEvent.change(input, { target: { value: '  ' } });
    fireEvent.submit(input);

    expect(mockSetCards).not.toHaveBeenCalled();
  });

  test('handles Enter and Escape keys in the input', () => {
    render(<AddCard column="todo" cards={mockCards} setCards={mockSetCards} />);
    fireEvent.click(screen.getByText(/add task/i));
    const input = screen.getByPlaceholderText('Add new task...');
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByPlaceholderText(/add new task/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/add task/i));
    fireEvent.keyDown(input, { key: 'Enter', target: { value: '' } });
    expect(mockSetCards).not.toHaveBeenCalled();
  });
});
