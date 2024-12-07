import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import Home from "./Components/Home/Home";
import Navigation from "./Components/Navigation/Navigation";
import Profile from "./Components/Profile/Profile";
import ViewTransactions from "./Components/ViewTransactions/ViewTransactions";
import Dashboard from "./Components/Dashboard/Dashboard";

// Component for Protected Routes
const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if the user is logged in

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const AppContent = () => {
  const location = useLocation();

  // List of routes where Navigation is not required
  const noNavRoutes = ["/login", "/signup", "/"]; // Include home page
  const shouldShowNav = !noNavRoutes.includes(location.pathname);
  const [active, setActive] = useState(1);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Show navigation bar only on allowed routes */}
      {shouldShowNav && <Navigation active={active} setActive={setActive} />}
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private Routes */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/viewtransactions" element={<ViewTransactions />} />
            <Route path="/transactions" element={<Dashboard />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div> 
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
