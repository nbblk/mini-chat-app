import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders username and button', () => {
  render(<App />);
  expect(screen.getByTestId('landing-text')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByTestId('landing')).toHaveClass('landing');
});

test('alert when input is empty', () => {
  render(<App />);
  userEvent.type('');
  expect(screen.getByRole('alert')).toHaveTextContent('Please enter a username');
  expect(screen.getByRole('alert')).toHaveStyle('color: red');
});

test('renders chat after clicking submit', async () => {
  render(<App />);
  userEvent.type(screen.getByRole('textbox'), 'username');
  await userEvent.click(screen.getByText('Submit'));
  expect(screen.getByTestId('chat')).toHaveClass('chat');
  expect(screen.getByTestId('chat-text')).toHaveAttribute('placeholder', 'Enter a message');
  expect(screen.getByRole('button')).toHaveTextContent('Enter');
});