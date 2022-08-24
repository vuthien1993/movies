import React, { useState, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";

import { Link } from "react-router-dom";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.css";
function NavBar() {
  const [changeColor, setChangeColor] = useState(false);
  useEffect(() => {
    const changeColorHandler = () => {
      //console.log(window.scrollY);
      if (window.scrollY >= 100) {
        setChangeColor(true);
      } else {
        setChangeColor(false);
      }
    };
    window.addEventListener("scroll", changeColorHandler);
  }, []);
  return (
    <React.Fragment>
      <div className={`borderTotal sticky ${changeColor && "background"}`}>
        <div className="borderNavbar">
          <div className="fll">
            <p>
              <Link to="/" className="link textNone">
                Movie App
              </Link>
            </p>
          </div>
          <div className="fll icon">
            <Link to="/search" className="link">
              <CartIcon />
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NavBar;
