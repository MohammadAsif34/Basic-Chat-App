import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRotes from "./routes/PrivateRotes";
import PublicRotes from "./routes/PublicRotes";
import PageNotFound from "./pages/PageNotFound";
import { useUser } from "./context/CreateContext";

const App = () => {
  const { appKey } = useUser();
  return (
    <div key={appKey}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<PrivateRotes />} />
          <Route path="/auth/*" element={<PublicRotes />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
