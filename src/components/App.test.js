import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Blockchain Playground', () => {
  render(<App />);
  const linkElement = screen.getByText(/Blockchain Playground/i);
  expect(linkElement).toBeInTheDocument();
});
