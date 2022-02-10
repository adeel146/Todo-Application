import * as React from "react";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "./FireBase";
import { useNavigate } from "react-router-dom";
import { AppBar, Typography } from "@mui/material";

export default function TodoAppBar() {
  const navigate = useNavigate();
  const logout = async () => {

    await signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <AppBar position="static">
      <Typography variant="h4" align="center" style={{ padding: "20px" }}>
        Group Messaging
        {auth?.currentUser && (
          <Button
            style={{ float: "right" }}
            color="inherit"
            variant="outlined"
            onClick={logout}
          >
            logout
          </Button>
        )}
      </Typography>
    </AppBar>
  );
}
