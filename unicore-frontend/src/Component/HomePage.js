import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Header from "./Header"; // shared header

function HomePage() {
  const history = useNavigate();

  const handleClkBtnSU = () => {
    history("/signup");
  };

  const handleClkBtnSI = () => {
    history("/signin");
  };

  return (
    <div className="container-home">
      <Header />
      <main>
        <h1>
          <span className="part1">
            Getting Started <br />
            with
          </span>{" "}
          <span className="part2"> UniCore</span>
        </h1>
        <p>
          <span className="part1">Welcome to UniCore,</span>{" "}
          <span className="part2">
            where you're part of a distant yet closely-knit group.
          </span>
        </p>
        <div className="buttons">
          <button onClick={() => alert("Learn More")} className="learn-more">
            Learn More
          </button>
          <div className="break"></div> {/*new line*/}
          <button onClick={handleClkBtnSI} className="si-btn">
            Sign In
          </button>
          {/* <button onClick={() => alert('Sign Up')} className="sign-up">Sign Up</button> */}
          <button onClick={handleClkBtnSU} className="su-btn">
            Sign Up
          </button>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
