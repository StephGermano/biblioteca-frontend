import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Rent from "./components/Rent/Rent";
import Book from "./components/Book/Book";
import Client from "./components/Client/Client";
import Menu from "./components/Menu";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Menu />
    <BrowserRouter>
      <Routes>
        <Route key="/" path="/" element={<Rent />} />
        <Route key="rent" path="/rent" element={<Rent />} />
        <Route key="book" path="/book" element={<Book />} />
        <Route key="client" path="/client" element={<Client />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
