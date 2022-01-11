import React from "react";
import { auth } from "./FireBase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [RegisterEmail, setRegisterEmail] = useState("");
  const [RegisterPassword, setRegisterPassword] = useState("");
  const [error, seterror] = useState()
  const navigate = useNavigate();
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        RegisterEmail,
        RegisterPassword
      );
      navigate("/home");
      console.log(user);
    } catch (error) {
        seterror(error.message)
      console.log(error.message);
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <h3> Register User </h3>
        <TextField
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
            seterror("")
          }}
        />
        <TextField
          type={"password"}
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
            seterror("")
          }}
        />
        <Button
          style={{ padding: "20px" }}
          onClick={() => {
            register();
            setRegisterEmail("");
            setRegisterPassword("");
          }}
        >
          {" "}
          Create User
        </Button>
      </div>
      <Link to={"/"}>
        <Button style={{ padding: "20px" }}> Sign In</Button>
      </Link>
      <p style={{color:"red"}}>{error}</p>

    </div>
  );
}
export default SignUp;
