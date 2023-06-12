import React from 'react';
import { Home, Sukses } from './pages';
import { NavbarComponents } from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Testing from './Testing';
import Pesanans from './pages/Pesanans';

export default function App() {
  return (
    <BrowserRouter>
      <NavbarComponents />
      <main>
        <Routes>
          <Route Component={Home} path="/" />
          <Route Component={Sukses} path="sukses" />
          <Route Component={Pesanans} path="pesanan" />
          <Route Component={Testing} path="testing" />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
