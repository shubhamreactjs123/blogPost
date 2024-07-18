import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const BlogPostList = lazy(() => import('./modules/BlogPostList'));
const BlogPostDetails = lazy(() => import('./components/BlogPostDetails'));

const App = () => {
  return (
    <div>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<BlogPostList />} />
          <Route path="/post/:index" element={<BlogPostDetails />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
