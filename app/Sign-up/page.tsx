"use client";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("http://localhost:3000/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (res.ok) {
            setUser({
              email: "",
              password: "",
              fullName: "",
            });
            toast.success("شما با موفقیت ثبت نام کردید!", {
              position: toast.POSITION.TOP_CENTER,
            });
            setLoading(false);
            router.push("/Login");
          } else if (res.status === 409) {
            setLoading(false);

            toast.error("ایمیل تکراری است", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            setLoading(false);

            toast.error("مشکلی پیش آمده است!", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => console.log(error));
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
          type="text"
          value={user.fullName}
          onChange={handleChange}
          name="fullName"
          placeholder="نام و نام خانوادگی"
          className="w-full rounded-lg p-2 my-5 border"
        />
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
        <Link href="/Login">
          <span className="text-slate-400">قبلا ثبت نام کرده اید؟</span>
        </Link>

        <button
          type="submit"
          className="px-10 py-3 rounded-lg border mt-5 flex justify-center items-center"
        >
          {loading ? <CircularProgress /> : <p>ثبت نام</p>}
        </button>
      </form>
    </div>
  );
}
