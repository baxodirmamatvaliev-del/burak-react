import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders home text', () => {
  const { getByText } = render(<App />);

  expect(getByText(/home/i)).toBeTruthy();
});
