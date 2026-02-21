import React from "react";
import WelcomeSection from "../components/WelcomeSection";
import HeroSlider from "../components/HeroSlider";
import BookEvent from "../components/BookEvent";
import HeroHighlight from "../components/HeroHighlight";

const Home = () => {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <HeroSlider />

      <HeroHighlight />

      {/* Welcome / About */}
      <section className="section welcome-section">
        <WelcomeSection />
      </section>

      {/* BookEvent Section   */}
      <section className="section products-section">
        {/* <BookEvent /> */}
      </section>

    </main>
  );
};

export default Home;
