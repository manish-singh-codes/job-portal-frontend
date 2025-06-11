import "./App.css";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import OfferBanner from "./components/shared/OfferBanner";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import JobDescription from "./pages/JobDescription";
import ProtectedRoute from "./components/PrivateRoute";
import ResetPassword from "./components/auth/ResetPassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import VerifyAccount from "./components/auth/VerifyAccount";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "./redux/authSlice";
import { useEffect } from "react";
import axiosInstance from "./utils/axios/axiosInstance";
import { LoaderCircle } from "lucide-react";
function App() {
  
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUser = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axiosInstance.get("/api/user/getUser", {
          withCredentials: true,
        });
        dispatch(setUser(res.data.user));
      } catch (error) {
        dispatch(setUser(null));
      } finally {
        dispatch(setLoading(false));
      }
    };
    getUser();
  }, [dispatch]);

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
          <Route path="/jobs/:id" element={<JobDescription/>} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route  element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
