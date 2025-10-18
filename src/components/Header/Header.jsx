import React from 'react';
import './Header.scss';

/**
 * Header Component - Single Responsibility Principle
 * Responsible only for displaying the application header
 */
const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-perfetto-beige">
        <div className="container">
          <a className="navbar-brand header__brand" href="#">
            <span className="header__brand-text font-primary">Perfetto Caffè</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link header__nav-link" href="#home">
                  Startseite
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link header__nav-link" href="#menu">
                  Speisekarte
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link header__nav-link" href="#about">
                  Über uns
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link header__nav-link" href="#contact">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

