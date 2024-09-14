import React, { useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Main from "./Components/Main";
import "./Components/Header.css";
import { GlobalStorage } from "./Hooks/GlobalContext";
import insurance from "./Assets/insurance.jpg";
import "antd/dist/reset.css";

const App = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const location = useLocation();
  const handleNavToggle = () => {
    setIsNavVisible(!isNavVisible);
  };

  // Check if the current route is not /admin/listxyzt
  const shouldShowQuoteSection = location.pathname !== "/admin/listxyzt";

  return (
    <GlobalStorage>
      <>
        {/* Conditionally render the quote section */}
        {shouldShowQuoteSection && (
          <>
            <header className="header">
              <div className="header-content">
                <div className="logo">Bethel Elite Insurance</div>

                <button
                  className="nav-toggle"
                  onClick={handleNavToggle}
                  style={{ color: "white" }}
                >
                  ☰ {/* Hamburger icon */}
                </button>

                <nav className={`nav ${isNavVisible ? "nav-visible" : ""}`}>
                  <a href="/" className="nav-link">
                    Insurance & more
                  </a>
                  <a href="#" className="nav-link">
                    Resources
                  </a>
                  <a href="#" className="nav-link">
                    Claims
                  </a>
                  <a href="#" className="nav-link">
                    Help & Support
                  </a>
                  <a href="#" className="nav-link">
                    Find an agent
                  </a>
                </nav>

                <button className="quote-button">Get a Quote</button>
              </div>
            </header>

            <section
              className="quote-section"
              style={{ marginTop: 30, marginBottom: 20 }}
            >
              <div className="quote-content">
                <h1 className="quote-title">
                  get a{" "}
                  <span
                    className="highlight"
                    style={{ display: "inline-table" }}
                  >
                    quote
                  </span>{" "}
                  in the blink of an eye
                </h1>
                <p className="quote-subtitle">
                  Fill in your details and get quick response
                </p>
              </div>
              <div className="quote-image">
                <img src={insurance} alt="Happy customer" />
              </div>
            </section>
          </>
        )}

        <Main />
      </>
    </GlobalStorage>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
