import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WS from 'jest-websocket-mock';
import App from './App';


test('renders username and button', () => {
  render(<App />);
  expect(screen.getByTestId('landing-text')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByTestId('landing')).toHaveClass('landing');
});

test('alert when input is empty', () => {
  render(<App />);
  userEvent.type(screen.getByTestId('landing-text'), '');
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

it('connect websocket response', async done => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const server = new WS('ws://localhost:3001');
  const client = new WebSocket("ws://localhost:3000");
  await server.connected;
  client.send('hi');
  await expect(server).toReceiveMessage("hi");

}, 50000);
// test('renders message after clicking enter', async () => {
//   render(<App />);
//   userEvent.type(screen.getByTestId('landing-text'), 'username');
//   await userEvent.click(screen.getByText('Submit'));
  
//   userEvent.type(screen.getByTestId('chat-text'), 'hi there');
//   await userEvent.click(screen.getByText('Enter'));
  
//   expect(screen.getByTestId('chatbox')).toContainElement(screen.getByTestId('message'));
// });