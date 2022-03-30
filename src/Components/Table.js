import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import AlertDialog from "./Dialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import db from "./FireBase";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import { auth } from "./FireBase";
import { getAuth } from "firebase/auth";
import Container from '@mui/material/Container';

const BasicTable = () => {
  const auth = getAuth()
  // const [dataBase, setdataBase] = useState(auth?.currentUser?.email);
  const [data, setdata] = useState([]);
  const [input, setinput] = useState("");
  const navigate = useNavigate();
const dataBase =auth?.currentUser?.email
  const logout = async () => {
    await signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    onSnapshot(
      query(collection(db, `${dataBase}`), orderBy("timestamp", "desc")),
      (snapshot) =>
        setdata(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    
  }, [dataBase]);

  let SN = 0;

  const addTodo = async () => {
    const documentReference = collection(db, `${dataBase}`);
    const payload = { name: input, timestamp: serverTimestamp() };
    await addDoc(documentReference, payload);
  };


  return (
    <>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <TextField
        placeholder="Add ToDo"
          onChange={(e) => setinput(e.target.value)}
          value={input}
        ></TextField>

        <Button
          size="large"
          variant="contained"
          style={{ height: "55px" }}
          endIcon={<SendIcon />}
          onClick={() => {
            if (input.length > 0) {
              addTodo();
              setinput("");
            }
          }}
        >
          addDoc
        </Button>
      </div>
      <Container maxWidth="sm">
        <TableContainer component={Paper}>
          <Table
            sx={{
              maxWidth: 650,
              backgroundColor: "cornflowerblue",
              borderRadius: "10px",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Serial Number</TableCell>
                <TableCell align="right">Todo Task</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {SN++}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    <IconButton>
                      <AlertDialog
                        id={row.id}
                        name={row.name}
                        alert
                        dataBase={dataBase}
                      />
                    </IconButton>
                    <IconButton>
                      <AlertDialog id={row.id} name={row.name} dataBase={dataBase} />
                    </IconButton>
                    <Link to={`/view${row.name}`}>
                      <IconButton>
                        <VisibilityIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={logout}>logout</Button>
        </Container>
           </>
  );
};
export default BasicTable;
