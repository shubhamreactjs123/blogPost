import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BlogPostDetails from '../components/BlogPostDetails';

// Mock localStorage
const mockBlogPostItem = {
  title: "Test Blog Post",
  author: "John Doe",
  publishedAt: "2023-07-01T00:00:00Z",
  description: "This is a test blog post description.",
  urlToImage: "https://via.placeholder.com/150",
  url: "https://example.com",
};

Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockBlogPostItem));

describe('BlogPostDetails', () => {
  test('renders blog post details correctly', () => {
    render(
      <MemoryRouter initialEntries={['/post/1']}>
        <Routes>
          <Route path="/post/1" element={<BlogPostDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if blog post title is rendered
    expect(screen.getByText(/Test Blog Post/i)).toBeInTheDocument();

    // Check if blog post author is rendered
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();

    // Check if blog post description is rendered
    expect(screen.getByText(/This is a test blog post description./i)).toBeInTheDocument();

    // Check if "Back" button is rendered
    expect(screen.getByText(/Back/i)).toBeInTheDocument();

    // Check if "Read more" button is rendered
    expect(screen.getByText(/Read more/i)).toBeInTheDocument();
  });

  test('navigates back to blog post list on "Back" button click', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/post/1']}>
        <Routes>
          <Route path="/" element={<div>BlogPostList</div>} />
          <Route path="/post/1" element={<BlogPostDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = screen.getByText(/Back/i);
    fireEvent.click(backButton);

    // Check if it navigates back to the BlogPostList component
    expect(container.textContent).toBe("BlogPostList");
  });

  test('opens blog post URL in a new window on "Read more" button click', () => {
    global.open = jest.fn();

    render(
      <MemoryRouter initialEntries={['/post/1']}>
        <Routes>
          <Route path="/post/1" element={<BlogPostDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const readMoreButton = screen.getByText(/Read more/i);
    fireEvent.click(readMoreButton);

    // Check if the URL is opened in a new window
    expect(global.open).toHaveBeenCalledWith("https://example.com");
  });
});
