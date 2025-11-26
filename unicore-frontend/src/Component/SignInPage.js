import React, { useState } from "react";
import "./SignInPage.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // 引入 Header 组件
import axios from "../http.js";

function SignInPage() {
  const history = useNavigate();
  // const emailRef = useRef();
  // const passwordRef = useRef();
  const [LoginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Handle input change for all form fields
  const handleLoginInput = (input) => (e) => {
    setLoginData({ ...LoginData, [input]: e.target.value });
  };

  const handleSI = (event) => {
    event.preventDefault(); // 阻止表单的默认提交行为

    console.log("handleSI called");
    console.log(localStorage);

    // const email = emailRef.current.value;
    // const password = passwordRef.current.value;

    axios
      .post("/user/login", { email: LoginData.email, password: LoginData.password })
      .then((res) => {
        console.log(res.data);
        if (res.data.status_code === 0) {
          alert(res.data.message);
          // localStorage.setItem("user_state", "1");
          localStorage.setItem("token", res.data.token); // save jwt token to local storage
          localStorage.setItem("email", LoginData.email);
          localStorage.setItem("user_id", res.data.user.user_id);
          localStorage.setItem("school", res.data.user.school);
          console.log(localStorage);
          history("/browser");
        } else {
          // login failed
          alert(res.data.message);
          // handleLoginInput('email')({ target: { value: '' } });
          handleLoginInput('password')({ target: { value: '' } });
        }
      })
      .catch((err) => {
        console.error("Error signing in", err);
      });
  };

  return (
    <div className="container-si">
      <Header />
      <main className="main-si">
        <div className="sign-in">
          <h1>Sign In</h1>
          {/*Sign In*/}
          <form onSubmit={handleSI}>
            <label htmlFor="email">User email*</label>
            <input 
              type="email" 
              id="email" 
              // ref={emailRef} 
              value={LoginData.email}
              onChange={handleLoginInput('email')}
              required 
            />
            <label htmlFor="password">password*</label>
            <input 
              type="password" 
              id="password" 
              // ref={passwordRef} 
              value={LoginData.password}
              onChange={handleLoginInput('password')}
              required 
            />
            <button type="submit" className="btnsi-si">Sign In</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SignInPage;
