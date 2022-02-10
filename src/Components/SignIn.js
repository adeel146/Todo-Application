import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

function SignIn() {
  const [error, seterror] = useState();
  const [LoginEmail, setLoginEmail] = useState();
  const [LoginPassword, setLoginPassword] = useState();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);
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
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterror(errorMessage);
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  console.log("auth", auth.currentUser);
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <h3> Login </h3>
        <TextField
          autoFocus
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
      <p style={{ color: "red" }}>{error}</p>
      <Button color="inherit" variant="outlined" onClick={signInWithGoogle}>
        Sign in with
        <GoogleIcon />
      </Button>
      <Link to={"/signup"}>
        <Button style={{ padding: "20px" }}> Create a User</Button>
      </Link>
    </div>
  );
}

export default SignIn;
