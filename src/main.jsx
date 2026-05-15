import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { Slide, ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <ToastContainer
          hideProgressBar={true}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          transition={Slide}
          autoClose={1500}
          closeButton={false}
        />
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </>,
);
