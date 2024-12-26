import axios from "axios";
import "./App.css";

// const api = axios.create({
//   baseURL: "http://localhost:8080",
// });

// api.get("/api/users").then(function (response) {
//   console.log(response.data);
// });

axios.get("/api/users").then(function (response) {
  console.log(response.data);
});

function App() {
  return <></>;
}

export default App;
