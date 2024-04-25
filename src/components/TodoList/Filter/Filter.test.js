import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from './Filter';

describe('Filter Component', () => {
  const mockSetSelectedTab = jest.fn();
  const mockSetFiltered = jest.fn();
  const tabs = ['All', 'Active', 'Completed'];

  const setup = () => {
    return render(<Filter selectedTab="All" setSelectedTab={mockSetSelectedTab} tabs={tabs} setFiltered={mockSetFiltered} />);
  };

  test('renders all tabs', () => {
    setup();
    tabs.forEach(tab => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  test('sets selected tab on click', () => {
    setup();
    const activeTab = screen.getByText('Active');
    fireEvent.click(activeTab);
    expect(mockSetSelectedTab).toHaveBeenCalledWith('Active');
    expect(mockSetFiltered).toHaveBeenCalledWith('Active');
  });
});
