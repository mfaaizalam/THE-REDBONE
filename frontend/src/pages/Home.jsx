// src/pages/Home.jsx
import React from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import MenuPage from "../components/Menu";

const Home = () => {
  return (
    <div>
      <section id="home">
        <HeroSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="menu">
        <MenuPage /> {/* ← no props needed, reads from CartContext directly */}
      </section>
    </div>
  );
};

export default Home;