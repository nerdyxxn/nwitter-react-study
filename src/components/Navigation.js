import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav>
    <ul className="nav__container">
      <li>
        <Link to="/" className="link__toHome">
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
        </Link>
      </li>
      <li>
        <Link to="/profile" className="line__toProfile">
          <FontAwesomeIcon icon={faUser} color={"04AAFF"} size="2x" />
          <span className="nav__userName">
            {userObj.displayName}님의 Profile
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
