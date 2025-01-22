import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RefrshHandler from "./refreshHandler";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to={"/login"} />;
  };

  return (
    <>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/home"
          element={<PrivateRoute element={<Home />} />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
