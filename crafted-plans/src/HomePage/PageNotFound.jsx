import React from "react";
import { Link } from "react-router-dom";
import '../Styles/PageNotFound.css'

const PageNotFound = () => {
  return (
    <div className="not-found-container">
    <div className="flex-title-not-found">
    <img  src="Images/wired-outline-112-book.gif" className="car-svg-not-found" alt="not found" />
      <h1 className="title-text-not-found">Ooooooops!</h1>
      <p className="subTitle-not-found"> Page Not Found</p>
      <div className="home-button-not-found">
        <Link to="/" className="btn-not">Go to Home </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;