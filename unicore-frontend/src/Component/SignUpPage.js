import React, { useState } from "react";
import axios from "../http.js";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // 引入 Header 组件

const SignUpPage = () => {
  const history = useNavigate();

  const handleSI = (event) => {
    console.log("handleSI called");
    console.log(localStorage);
    event.preventDefault(); // 阻止表单的默认提交行为

    axios
      .post("/user/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status_code === 0) {
          // localStorage.setItem("user_state", "1");
          localStorage.setItem("token", res.data.token); // save jwt token to local storage
          localStorage.setItem("email", formData.email);
          localStorage.setItem("user_id", res.data.user.user_id);
          localStorage.setItem("school", res.data.user.school);
          console.log(localStorage);
          // history("/profile");
          history("/browser");
        } else {
          // login failed
          alert(res.data.message);
          // handleUserInput('email')({ target: { value: '' } });
          handleUserInput("password")({ target: { value: "" } });
        }
      })
      .catch((err) => {
        console.error("Error signing in", err);
      });
  };

  const [step, setStep] = useState(1);
  // Register
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    vrfcode: "",
  });
  // Handle input change for all form fields
  const handleUserInput = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };
  // debug
  const handleVerify = async (event) => {
    event.preventDefault(); // 阻止表单的默认提交行为
    console.log("handleVerify called");
    axios
      .post("/user/verify", { email: formData.email })
      .then((res) => {
        console.log(res.data.Message);
        if (res.data.status_code === 0) {
          alert("Verification Code has been sent!");
          nextStep();
        } else if (
          res.data.Message ===
          "Verification code sent, please check your mail box again."
        ) {
          alert("Please check your mail box again.");
          nextStep();
        } else {
          // invalid email
          alert(res.data.Message);
          handleUserInput("email")({ target: { value: "" } });
        }
        // nextStep();
      })
      .catch((err) => {
        console.error("Error signing up", err);
      });
  };
  const handleRegister = async (event) => {
    event.preventDefault(); // 阻止表单的默认提交行为
    console.log("handleRegister called");
    try {
      const response = await axios.post("/user/register", {
        email: formData.email,
        password: formData.password,
        ver_code: formData.vrfcode,
        username: "",
      });
      console.log(response.data);
      if (response.data.status_code === 0) {
        alert("Register Success");
        console.log("Register success");
        nextStep();
      } else {
        console.log(response.data.message);
        alert("Register Failed");
      }
    } catch (error) {
      console.error("Error signing up", error);
    }
  };
  const nextStep = () => {
    setStep((prevStep) => (prevStep < 4 ? prevStep + 1 : prevStep));
  };

  const prevStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  return (
    <div className="container-su">
      <Header />
      <main className="main-su">
        {step === 1 && (
          <div className="set-email">
            <h1>Create an account</h1>
            {/*Set email*/}
            <form onSubmit={handleVerify}>
              <label htmlFor="email">Student Email Address*</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleUserInput("email")}
                required
              />
              <button type="submit" className="btnsu-su">
                Sign Up
              </button>
            </form>
          </div>
        )}
        {step === 2 && (
          <div className="set-pswd">
            <h1>Set Password</h1>
            {/* Password input */}
            <form>
              <label htmlFor="password">Set Password*</label>
              <input
                type="password"
                id="pswd"
                value={formData.password}
                onChange={handleUserInput("password")}
                required
              />
              <div className="backnext">
                <button className="back" onClick={prevStep}>
                  Back
                </button>
                <button className="next" type="submit" onClick={nextStep}>
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
        {step === 3 && (
          <div className="vrf-email">
            <h1>Verificate</h1>
            {/*confirm verification code*/}
            <form onSubmit={handleRegister}>
              <label htmlFor="vrfcode">
                Confirm Verification Code Sent to Your Email*
              </label>
              <input
                type="text"
                id="vrfcode"
                value={formData.vrfcode}
                onChange={handleUserInput("vrfcode")}
                required
              />
              <div className="backnext">
                <button className="back" onClick={prevStep}>
                  Back
                </button>
                <button className="next" type="submit">
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
        {step === 4 && (
          <div className="su-suc">
            <h1>Success!</h1>
            {/*success*/}
            <form onSubmit={handleSI}>
              <button type="submit" className="btnsu-si">
                Sign In
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default SignUpPage;
