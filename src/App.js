import { React, useState } from "react";
import GameSpace from "./components/GameSpace"
import Navbar from "./components/Navbar/Navbar";
//import Juego from "./components/Juego";
import Cards from "./components/cards";
import PageError from "./components/PageError";
import TaTeTi from "./TaTeTi";
import GameMemoria from "./components/JuegoMemoria/Game"
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App(){
  return(<>
      <Navbar/>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<></>} />
              <Route path="/JuegoSpace" element={<GameSpace/>} />
              <Route path="/desarrolladores" element={<Cards/>} />
              <Route path="/JuegoTateti" element={<TaTeTi/>} />
              <Route path="/JuegoMemoria" element={<GameMemoria/>} />
              <Route path="*" element={<PageError/>} />
          </Routes>
      </BrowserRouter></>
  );
}