import React, { useState } from "react";
import Brand from "../../components/ui/Brand";
import { GoogleLogin } from "@react-oauth/google";
import { authAPI } from "../../services/api/authAPI";
import { setCredentials } from "../../services/slice/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Loader } from "../../components/ui/Loader";

const AuthPage = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await authAPI.login(form);
      if (data.success && data.token) {
        setError("");
        setMsg(data.message);
        dispatch(setCredentials(data.token));
        toast.success(data.message);
      }
    } catch (error) {
      setMsg("");
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credential) => {
    try {
      setLoading(true);
      const { data } = await authAPI.googleCallback(credential);
      console.log(data);
      if (data.success && data.token) {
        setError("");
        setMsg(data.message);
        dispatch(setCredentials(data.token));
        toast.success(data.message);
      }
    } catch (error) {
      setMsg("");
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <main className="w-full h-screen bg-slate-100  flex justify-center items-center">
        <div className=" w-md py-8 px-12 rounded-2xl bg-white shadow">
          <Brand />
          <h2 className="text-2xl text-center  my-2 mt-4 ">Welcome Back,</h2>
          <p className="text-gray-400 text-center font-thin">
            Sign to continue your conversations.
          </p>
          <form action="" className="py-4" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-gray-500 ">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="w-full h-10 mb-3 mt-1 px-3 border border-gray-400 rounded-md outline-0 "
              placeholder="email..."
              required
            />
            <label htmlFor="password" className="text-gray-500 ">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className="w-full h-10 mb-3 mt-1 px-3 border border-gray-400 rounded-md outline-0 "
              placeholder="password..."
              required
            />
            <button
              className="w-full h-10 mb-3 mt-4  text-white bg-slate-500 rounded-md cursor-pointer hover:bg-slate-400 disabled:cursor-progress"
              disabled={loading}
            >
              Login
            </button>
          </form>
          {/* <hr /> */}
          <div className="relative mb-8 border border-gray-300">
            <p className="px-2 text-slate-400 absolute top-1/2 left-1/2 -translate-1/2 bg-white ">
              OR
            </p>
          </div>
          <GoogleLogin
            onSuccess={(res) =>
              handleGoogleLogin({ credential: res.credential })
            }
          />
          <p className="my-2 text-center text-red-500 text-wrap truncate line-clamp-2">
            {error}
          </p>
          <p className="my-2 text-center text-green-500 text-wrap truncate line-clamp-2">
            {msg}
          </p>
        </div>
      </main>
    </>
  );
};

export default AuthPage;
