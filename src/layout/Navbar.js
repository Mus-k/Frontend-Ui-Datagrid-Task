import { useState } from "react";
import { default as Logo } from "../assets/logo/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [click, setClick] = useState(false);

  // toggle function for hamburger menu
  function handleClick() {
    setClick(!click);
  }
  return (
    <nav className="nav">
      <div className="logo-div">
        {" "}
        <Link to="https://rastmobile.com/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <ul className={click ? "menu active" : "menu"}>
        <li className="nav-item">
          <Link to="/Hakkımızda" onClick={handleClick}>
            Hakkımızda
          </Link>
        </li>
        <li className="nav-item" onClick={handleClick}>
          <Link to="/Jüri-Yarışma" className="item">
            Jüri-Yarışma Yazılımı
          </Link>
        </li>
        <li className="nav-item" onClick={handleClick}>
          <Link to="/Word Ninja">Word Ninja</Link>
        </li>
        <li className="nav-item" onClick={handleClick}>
          <Link to="/">Word Pyramıds</Link>
        </li>
      </ul>
      <SocialIcons />
      <div className="nav-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
    </nav>
  );
}

// gezinme çubuğu simgeleri
function SocialIcons() {
  return (
    <div className="social">
      <p>
        <i className="fa-brands fa-youtube"></i>
      </p>
      <p>
        <i className="fa-brands fa-instagram"></i>
      </p>
      <p>
        <i className="fa-brands fa-square-behance"></i>
      </p>
      <p>
        <i className="fa-brands fa-linkedin"></i>
      </p>
    </div>
  );
}
