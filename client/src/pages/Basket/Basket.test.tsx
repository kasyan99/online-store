import React from 'react';
import { render, screen } from '@testing-library/react';
import Basket from './Basket';

test('renders learn react link', () => {
  render(<Basket />);
  const linkElement = screen.getByText(/Basket/i);
  expect(linkElement).toBeInTheDocument();
});
