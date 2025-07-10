import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getLogin } from "../services/authService";
import { toast } from "react-toastify";
import { useUser } from "../context/CreateContext";

const Login = () => {
  const { user, setAppKey } = useUser();
  const [form, setForm] = useState({ phone: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await getLogin(form);
    console.log("login api :: ", res);
    if (res?.status == "OK") {
      console.log("login seccess");
      toast.success(res.message);
      setAppKey((p) => p + 1);
    } else {
      setForm({ phone: "", password: "" });
      toast.error(res.message);
    }
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 500);
    }
  }, [user]);

  return (
    <>
      <div className="w-full max-sm:px-4 h-screen flex justify-center items-center">
        <form
          className="w-1/3 max-sm:w-1/1 max-lg:w-2/3 px-12 py-8 border border-neutral-700 rounded-xl"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-10 text-center text-4xl font-semibold ">Login</h1>
          <label className="px-2">Phone</label>
          <div className="h-10 mb-4 border border-neutral-500 rounded-md ">
            <input
              type="text"
              className="w-full h-full px-4 border-0  transition-all"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <label className="px-2">Password</label>
          <div className="h-10 mb-4 border border-neutral-500 rounded-md ">
            <input
              type="text"
              className="w-full h-full px-4 border-0  transition-all"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button className="w-full h-10 my-10 border border-neutral-500 rounded-md active:border-neutral-300 cursor-pointer hover:bg-neutral-800">
            Login
          </button>
          <div className="text-sm text-center flex max-sm:flex-col justify-between ">
            <p>forget password</p>
            <p>
              Don't have an account?{" "}
              <Link to={"/auth/register"}>
                <span className="text-purple-500 underline">register</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
