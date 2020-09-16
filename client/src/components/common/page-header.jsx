import React from "react";
import "./page-header.css";

const PageHeader = ({ title, description }) => {
  return (
    <React.Fragment>
      <div className="view intro-2 mt-1 ">
        <div className="full-bg-img">
          <div className="mask rgba-black-strong flex-center">
            <div className="container">
              <div className="white-text text-center wow fadeInUp ">
                <h1> {title}</h1> <h4> {description}</h4> <br></br> <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageHeader;
