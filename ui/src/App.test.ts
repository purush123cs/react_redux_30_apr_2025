import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app component', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i); // Adjust based on your App content
  expect(linkElement).toBeInTheDocument();
});