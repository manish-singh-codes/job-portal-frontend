import "./App.css";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import OfferBanner from "./components/shared/OfferBanner";
import Jobs from "./pages/Jobs";
function App() {
  return (
    <>
      <BrowserRouter>
        <OfferBanner/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/jobs" element={<Jobs/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
