// /profile
import Panel from "./ProfilePage/Panel";
import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "./AppHeader";
import { Container, Box } from "@mui/material";
import axios from "../http.js";
import { useNavigate } from "react-router-dom";

function Profile() {
  // get user info from axios using email in localstorage
  const [userInfo, setUserInfo] = useState({});
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/user/info?email=${email}`)
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data.user);
      })
      .catch((err) => {
        console.error("Error getting user info", err);
      });
  }, [email]);

  return (
    <Box
      bgcolor="#e0f7fa"
      sx={{
        minHeight: "100vh",
      }}
    >
      {/* <Container> */}
      <ResponsiveAppBar />
      <Panel userInfo={userInfo} />
      {/* </Container> */}
    </Box>
  );
}

export default Profile;
