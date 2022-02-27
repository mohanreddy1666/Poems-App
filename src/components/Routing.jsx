import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import LandingPage from './LandingPage';
import PoemDetails from './PoemDetails';

export default function Routing({ data }) {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Header />}></Route>
        <Route path='/home' element={<LandingPage data={data} />}></Route>
        <Route
          path='/author/:poemAuthor/title/:poemTitle'
          element={<PoemDetails data={data} />}
        ></Route>
      </Routes>
    </Router>
  );
}
