import { render, screen } from '@testing-library/react';
import App from './App';

test('renders DonoToken', () => {
  render(<App />);
  const linkElement = screen.getByText(/DonoToken/i);
  expect(linkElement).toBeInTheDocument();
});
