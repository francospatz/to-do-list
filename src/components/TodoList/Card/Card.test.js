import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card', () => {
  const mockHandleDragStart = jest.fn();
  const mockHandleDelete = jest.fn();

  beforeEach(() => {
    // Mock local storage
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([{ id: '1', isChecked: false }]));
    Storage.prototype.setItem = jest.fn();
  });

  test('should render card with the given title', () => {
    render(<Card title="Test Card" id="1" column="ToDo" handleDragStart={mockHandleDragStart} handleDelete={mockHandleDelete} filter="all" />);
    expect(screen.getByText('Test Card')).toBeInTheDocument();
  });

});
