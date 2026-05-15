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
