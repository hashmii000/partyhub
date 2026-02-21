import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Footer from "./components/Footer";
import Home from "./pages/Home";

import ScrollToTop from "./pages/ScrollTop";
import Navbar from "./components/navbar";
import "./index.css";
import FooterNew from "./components/FooterNew";

import PreLaunchModal from "./components/PreLaunchForm/PreLaunchModal";


function App() {
  return (
    <div className="app-root">
      <Toaster
        position="top-right"
        containerStyle={{
          zIndex: 100000,
        }}
      />

      <PreLaunchModal />
      <Navbar />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      {/* <Footer /> */}
      <FooterNew />
    </div>
  );
}

export default App;
