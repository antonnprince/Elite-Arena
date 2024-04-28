import React from 'react'
import './css/style.css'// Assuming you still need custom styles

const Nav = () => {
  return (
    <header className="header">

   
    <div className="overlay" data-overlay></div>

    <div className="container">

      <a href="#" className="logo">
        <img src="./assets/images/logo.svg" alt="GameX logo"/>
      </a>

      <button className="nav-open-btn" data-nav-open-btn>
        <ion-icon name="menu-outline"></ion-icon>
      </button>

      <nav className="navbar" data-nav>

        <div className="navbar-top">

          <a href="#" className="logo">
            <img src="./assets/images/logo.svg" alt="GameX logo"/>
          </a>

          <button className="nav-close-btn" data-nav-close-btn>
            <ion-icon name="close-outline"></ion-icon>
          </button>

        </div>

        <ul className="navbar-list">

          <li>
            <a href="#hero" className="navbar-link">Home</a>
          </li>

          <li>
            <a href="#about" className="navbar-link">About</a>
          </li>

          <li>
            <a href="#tournament" className="navbar-link">Tournament</a>
          </li>

          <li>
            <a href="#team" className="navbar-link">Team</a>
          </li>

          <li>
            <a href="#gears" className="navbar-link">Gears</a>
          </li>

          <li>
            <a href="#contact" className="navbar-link">Contact</a>
          </li>

        </ul>

        <ul className="nav-social-list">

          <li>
            <a href="#" className="social-link">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </li>

          <li>
            <a href="#" className="social-link">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </li>

          <li>
            <a href="#" className="social-link">
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </li>

          <li>
            <a href="#" className="social-link">
              <ion-icon name="logo-youtube"></ion-icon>
            </a>
          </li>

        </ul>

      </nav>

      <div className="header-actions">

        <button className="search">
          <ion-icon name="search-outline"></ion-icon>
        </button>

        <button className="btn-sign_in">

          <div className="icon-box">
            <ion-icon name="log-in-outline"></ion-icon>
          </div>

          <span>Log-in</span>

        </button>

      </div>

    </div>

  </header>

  )
}

export default Nav
