import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";
import { ReactComponent as LogoIcon } from "../assets/logos/property-seekers-LOGO.svg";
import "./Navbar.css";
import Filterdata from "./Filterdata";
export default function Navbar() {
  //initialize navigate hook
  const navigate = useNavigate();
  const location = useLocation();
  //change color for the page we are in
  const checkpage = (route) => {
    if (location.pathname === route) {
      return true;
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <LogoIcon width="60%" height="60%" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="d-flex">
            <ul className="navbarListItems">
              <li className="navbarListItem" onClick={() => navigate("/")}>
                <ExploreIcon
                  fill={checkpage("/") ? "#FF5C00" : "#000000"}
                  width="36px"
                  height="36px"
                />
                <p
                  className={
                    checkpage("/")
                      ? "navbarListItemNameActive"
                      : "navbarListItemName"
                  }
                >
                  Explore
                </p>
              </li>
              <li
                className="navbarListItem"
                onClick={() => navigate("/offers")}
              >
                <OfferIcon
                  fill={checkpage("/offers") ? "#FF5C00" : "#000000"}
                  width="36px"
                  height="36px"
                />
                <p
                  className={
                    checkpage("/offers")
                      ? "navbarListItemNameActive"
                      : "navbarListItemName"
                  }
                >
                  Offers
                </p>
              </li>
              <li className="navbarListItem" onClick={() => navigate("/user")}>
                <PersonOutlineIcon
                  fill={checkpage("/user") ? "#FF5C00" : "#000000"}
                  width="36px"
                  height="36px"
                />
                <p
                  className={
                    checkpage("/user")
                      ? "navbarListItemNameActive"
                      : "navbarListItemName"
                  }
                >
                  My Account
                </p>
              </li>
            </ul>
           
          </div>
        </div>
      </div>
    </nav>
  );
}
