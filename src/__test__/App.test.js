import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

jest.mock('../modules/BlogPostList', () => () => <div>BlogPostList</div>);
jest.mock('../components/BlogPostDetails', () => () => <div>BlogPostDetails</div>);

test('renders BlogPostList component', async () => {
  render(
    <Router>
      <App />
    </Router>
  );

  // Check if loading spinner is displayed
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  // Wait for the BlogPostList component to load
  await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

  // Check if BlogPostList component content is rendered
  expect(screen.getByText(/BlogPostList/i)).toBeInTheDocument();
});

test('renders BlogPostDetails component on route change', async () => {
  render(
    <Router initialEntries={['/post/1']}>
      <App />
    </Router>
  );

  // Check if loading spinner is displayed
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  // Wait for the BlogPostDetails component to load
  await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

  // Check if BlogPostDetails component content is rendered
  expect(screen.getByText(/BlogPostDetails/i)).toBeInTheDocument();
});
