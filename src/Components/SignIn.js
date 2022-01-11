import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

function SignIn() {
  const [error, seterror] = useState();
  const [LoginEmail, setLoginEmail] = useState();
  const [LoginPassword, setLoginPassword] = useState();
  const auth = getAuth();
  const navigate = useNavigate();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        LoginEmail,
        LoginPassword
      );
      navigate("/home");
      console.log("login-user", user);
    } catch (error) {
      seterror(error.message);
      console.log(error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <h3> Login </h3>
        <TextField
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
            seterror("");
          }}
        />
        <TextField
          type={"password"}
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
            seterror("");
          }}
        />

        <Button style={{ padding: "20px" }} onClick={login}>
          {" "}
          Login
        </Button>
      </div>
      <p style={{color:"red"}}>{error}</p>
      <Link to={"/signup"}>
        <Button style={{ padding: "20px" }}> Create a User</Button>
      </Link>
    </div>
  );
}

export default SignIn;
