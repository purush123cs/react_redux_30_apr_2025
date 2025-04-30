import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import { Counter } from './features/counter/Counter';
import { Quotes } from './features/quotes/Quotes';
import { Home } from './features/home/Home';
import { MovieList } from './features/movieList/MovieList';
import { ContentList } from './features/contentList/ContentList';

function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movieList" element={<MovieList />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/quotes" element={<Quotes />} />
      <Route path="/contentList" element={<ContentList />} />
    </Routes>
  </BrowserRouter>
  );
}

export default AppRouter;
