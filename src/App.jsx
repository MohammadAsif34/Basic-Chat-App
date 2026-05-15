import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import AuthPage from "./pages/auth-page/AuthPage";
import InvalidPage from "./pages/invalid-page/InvalidPage";
import { useAuth } from "./services/hooks/CustomHooks";
import { useEffect } from "react";
import { baseApi } from "./services/api/apiClient";
import { useState } from "react";
import { systemChange } from "./services/slice/authSlice";
import { Loader } from "./components/ui/Loader";
import { useDispatch } from "react-redux";
import ServerError from "./pages/invalid-page/ServerError";

const ProtectedRoute = () => {
  const { token } = useAuth();
  if (!token) return <Navigate to={"/login"} replace />;
  return <Outlet />;
};
const PublicRoute = () => {
  const { authenticated } = useAuth();
  if (authenticated) return <Navigate to={"/app"} replace />;
  return <Outlet />;
};
const App = () => {
  console.log("SYSTEM_CHECK");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const systemCheck = async () => {
      setLoading(true);
      try {
        const { data } = await baseApi.backendCheck();
        console.log(data.message);
        dispatch(systemChange(true));
      } catch (err) {
        console.log("SYSTEM_FAILURE...");
        console.error(err.response?.data?.message || err?.message);
      } finally {
        setLoading(false);
      }
    };
    systemCheck();
  }, []);
  const { system } = useAuth();
  if (loading) return <Loader />;
  if (!system && !loading) return <ServerError />;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/app"} replace />} />
          {/* protectedRoute  */}
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<HomePage />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<AuthPage />} />
          </Route>
          <Route path="*" element={<InvalidPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
