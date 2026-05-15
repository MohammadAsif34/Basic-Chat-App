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

      <main className="w-full h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950  relative overflow-hidden">
        {/* Neon background blobs */}
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full top-10 left-10" />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full bottom-10 right-10" />

        {/* Card */}
        <div
          className="relative z-10 w-[380px] py-8 px-10 rounded-2xl 
          bg-white/5 backdrop-blur-xl 
          border border-white/10 
shadow-[0_0_40px_rgba(34,211,238,0.15)]          "
        >
          <Brand />

          <h2 className="text-2xl text-center mt-4 text-cyan-300 font-semibold">
            Welcome Back
          </h2>

          <p className="text-center text-white/60 text-sm mt-1">
            Sign in to continue your conversations
          </p>

          {/* Form */}
          <form className="py-4" onSubmit={handleSubmit}>
            {/* Email */}
            <label className="text-white/70 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              placeholder="email..."
              required
              className="w-full h-10 mt-1 mb-3 px-3 
              bg-white/5 text-white 
              border border-cyan-500/20 
              rounded-md 
              outline-none 
              focus:border-cyan-400 
              focus:ring-2 focus:ring-cyan-400/30 
              transition-all"
            />

            {/* Password */}
            <label className="text-white/70 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={form.password || ""}
              onChange={handleChange}
              placeholder="password..."
              required
              className="w-full h-10 mt-1 mb-3 px-3 
              bg-white/5 text-white 
              border border-cyan-500/20 
              rounded-md 
              outline-none 
              focus:border-cyan-400 
              focus:ring-2 focus:ring-cyan-400/30 
              transition-all"
            />

            {/* Button */}
            <button
              disabled={loading}
              className="w-full h-10 mt-4 rounded-md 
              bg-gradient-to-r from-cyan-500 to-blue-500 
              text-white font-medium 
              hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] 
              hover:scale-[1.02] 
              active:scale-[0.98] 
              transition-all duration-200 
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Login
            </button>
          </form>

          {/* OR divider */}
          <div className="relative my-6">
            <div className="h-px bg-cyan-500/20" />
            <span
              className=" font-medium absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
               text-cyan-300 text-xs"
            >
              OR
            </span>
          </div>

          {/* Google Login */}
          <div
            className="w-fit flex justify-center  rounded-md  mx-auto
            hover:shadow-[0_0_15px_rgba(0,255,255,0.25)] 
            transition-all"
          >
            <GoogleLogin
              onSuccess={(res) =>
                handleGoogleLogin({ credential: res.credential })
              }
            />
          </div>

          {/* Messages */}
          {error && (
            <p className="text-red-400 text-center text-sm mt-3">{error}</p>
          )}

          {msg && (
            <p className="text-green-400 text-center text-sm mt-3">{msg}</p>
          )}
        </div>
      </main>
    </>
  );
};

export default AuthPage;
