import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

const PrivateRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCheck(true);
    }, 200); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  if (!showCheck || loading) {
    return (
      <div className="w-full h-screen flex justify-center items-start mt-[10%]">
        <LoaderCircle className="animate-spin w-20 h-20 text-indigo-500 " />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
