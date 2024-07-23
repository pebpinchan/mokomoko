import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  // const linkElement = screen.getByRole('link', { name : /learn react/i });
  expect(linkElement).toBeInTheDocument();
});

// test('renders learn react link', () => {
//   const { debug, baseElement } = render(<App />);
//   debug(baseElement);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test('renders learn react link', () => {
//   const para = document.createElement('p');
//   const { debug, baseElement } = render(<App />, {
//     container: document.body.appendChild(para)
//   })
//   debug(baseElement);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });