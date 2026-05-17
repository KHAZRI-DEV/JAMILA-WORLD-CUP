import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "./i18n";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Journey } from "./components/Journey";
import { Saveur } from "./components/Saveur";
import { LionsRoar } from "./components/LionsRoar";
import { Edition } from "./components/Edition";
import { Countdown } from "./components/Countdown";
import { Footer } from "./components/Footer";

const Landing = () => (
  <main data-testid="landing-page" className="relative bg-black text-white">
    <Header />
    <Hero />
    <div className="zellige-divider" />
    <Journey />
    <div className="zellige-divider" />
    <Saveur />
    <div className="ticket-tear" />
    <LionsRoar />
    <div className="zellige-divider" />
    <Edition />
    <div className="zellige-divider" />
    <Countdown />
    <Footer />
  </main>
);

function App() {
  return (
    <I18nProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
        </BrowserRouter>
      </div>
    </I18nProvider>
  );
}

export default App;
