import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import BlogPostList from '../modules/BlogPostList';
import { getListOfBlogPost } from '../services/BlogPostAPI';

// Mocking BlogPostAPI
jest.mock('../services/BlogPostAPI');

const mockBlogPosts = {
  data: {
    articles: Array.from({ length: 25 }, (_, i) => ({
      author: `Author ${i + 1}`,
      title: `Title ${i + 1}`,
      publishedAt: `2023-07-0${i + 1}`,
    })),
  },
};

describe('BlogPostList', () => {
  beforeEach(() => {
    getListOfBlogPost.mockImplementation((successCallback) => {
      successCallback(mockBlogPosts);
    });
  });

  test('renders blog post list', async () => {
    render(<BlogPostList />);
    
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    
    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    expect(screen.getByText(/Blog Posts/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(11); // 10 posts + header row
  });

  test('paginates through blog posts', async () => {
    render(<BlogPostList />);
    
    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());
    
    // Check initial render
    expect(screen.getAllByRole('row')).toHaveLength(11);

    // Click to go to the next page
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
    
    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    // Check that new items are rendered after pagination
    expect(screen.getAllByRole('row')).toHaveLength(11);
  });
});
