import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AppHeader from "../AppHeader";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "../../http.js";

function UserSettings() {
  const [openDialog, setOpenDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  // useEffect(() => {
  //   const settings = {
  //     username: "Trump",
  //     school: "University of Waterloo",
  //     description: "Make America Great Again!!!",
  //   };
  //   setUsername(settings.username);
  //   setSchool(settings.school);
  //   setDescription(settings.description);
  // }, []);

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setPasswordMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(newPassword === event.target.value);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    // <Container>
    <Box component="form" sx={{ mt: 1, backgroundColor: "rgb(224, 247, 250)" }}>
      <AppHeader />
      <Container sx={{ height: "100vh" }}>
        <Typography
          variant="body1"
          component="h1"
          sx={{
            display: "flex",
            fontFamily: "Bungee Inline",
            color: "rgba(1, 111, 160, 0.56)",
            fontWeight: "bold",
            fontSize: "25px",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          Account settings
        </Typography>

        <TextField
          value={localStorage.getItem("email")}
          // onChange={(e) => setSchool(e.target.value)}
          margin="normal"
          fullWidth
          label="email"
          disabled
        />

        <Button
          variant="outlined"
          onClick={handleClickOpen}
          sx={{
            display: "block",
            "&:hover": {
              backgroundColor: "hwb(0 93% 7% / 0.5)",
              textDecoration: "underline",
            },
            fontFamily: "Impact",
            color: "rgba(1, 111, 160, 0.55)",
            backgroundColor: "transparent",
            border: "1px solid #ddd",
            borderRadius: "5px",
            padding: "10px 15px",
            margin: "auto",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Change Password
        </Button>

        <Dialog
          open={openDialog}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const oldPassword = formJson.old_password;
              const newPassword = formJson.new_password;

              axios
                .post("/user/chpwd", {
                  cur_pwd: oldPassword,
                  new_pwd: newPassword,
                  email: localStorage.getItem("email"),
                })
                .then((res) => {
                  console.log(res.data);
                  if (res.data.status_code !== 0) {
                    alert(res.data.Message);
                  } else {
                    alert("Password changed successfully.");
                  }
                })
                .catch((err) => {
                  console.error("Error changing password", err);
                });

              console.log(formJson);

              handleClose();
            },
          }}
        >
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To change your password, please enter your old password and then
              enter your new password twice.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="old_password"
              label="Old Password"
              type="password"
              fullWidth
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="new_password"
              label="New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="confirm_password"
              label="New Password Again"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!passwordMatch}
              helperText={!passwordMatch ? "Passwords do not match" : ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={!passwordMatch}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {/* <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          保存
        </Button> */}
      </Container>
    </Box>
  );
}

export default UserSettings;
