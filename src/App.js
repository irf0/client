import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ChatsPage from "./Pages/ChatsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/chats" element={<ChatsPage />} />
      </Routes>
    </div>
  );
}

export default App;
