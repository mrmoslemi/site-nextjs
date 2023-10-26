"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { useAuthContext } from "@/hooks/useAuthContext";
export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const json = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
        setUser({
          email: "",
          password: "",
        });
        toast.success("شما با موفقیت  وارد شدید !", {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
        router.push("/");
      } else if (response.status === 401) {
        setLoading(false);
        toast.error("لطفا پیش از ورود ثبت نام کنید", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        setLoading(false);
        toast.error("مشکلی پیش آمده است!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error("مشکلی پیش آمده لطفا دوباره سعی کنید!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <form
        onSubmit={submitHandler}
        className="container flex flex-col items-center justify-center my-20 w-96"
      >
        <input
          type="email"
          value={user.email}
          onChange={handleChange}
          name="email"
          placeholder="ایمیل"
          className="w-full rounded-lg p-2 my-5 border"
        />
        <input
          type="password"
          value={user.password}
          onChange={handleChange}
          name="password"
          placeholder="رمز عبور"
          className="w-full rounded-lg p-2 my-5 border"
        />
        <Link href="/Sign-up">
          <span className="text-slate-400"> ثبت نام نکرده اید؟</span>
        </Link>

        <button
          type="submit"
          className="px-10 py-3 rounded-lg border mt-5 flex justify-center items-center"
        >
          {loading ? <CircularProgress /> : <p>ورود</p>}
        </button>
      </form>
    </div>
  );
}
