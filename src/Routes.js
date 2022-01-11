import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoAppBar from "./Components/Appbar";
import BasicTable from "./Components/Table";
import ViewOneItem from "./Components/ViewOneItem";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

function Configuration() {
  return (
    <Router>
      <TodoAppBar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="home" element={<BasicTable />} />
        <Route path="view:name" element={<ViewOneItem />} />
      </Routes>
    </Router>
  );
}

export default Configuration;
