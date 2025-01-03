import axios from "axios";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

// const api = axios.create({
//   baseURL: "http://localhost:8080",
// });

// api.get("/api/users").then(function (response) {
//   console.log(response.data);
// });

// axios.get("/api/users").then(function (response) {
//   console.log(response.data);
// });

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
