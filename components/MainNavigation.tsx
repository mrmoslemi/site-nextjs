"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/hooks/useAuthContext";
import { toast } from "react-toastify";

export default function MainNavigation() {
  const { user, dispatch } = useAuthContext();
  console.log(user);

  const logOutHandler = () => {
    localStorage.removeItem("user");
    toast.success("از حساب کاربری خود خارج شدید", {
      position: toast.POSITION.TOP_CENTER,
    });

    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="flex justify-center items-center shadow-md sticky top-0 z-50 bg-white">
      <div className="container flex justify-between py-6 items-center">
        <ul className="flex relative">
          <button className="peer">
            <Image
              className="mx-5"
              src="/key.svg"
              alt="key"
              width={30}
              height={30}
            />
          </button>
          <div
            id="dropdown"
            className="z-10 top-7 hover:flex absolute hidden peer-hover:flex bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <Link href={`${!user ? "/Login" : "/Pannel"}`}>
                <li className="block px-4 py-2">
                  <p>{user ? "پروفایل" : "ورود/ثبت نام"}</p>
                </li>
              </Link>

              {user ? (
                <li
                  onClick={logOutHandler}
                  className="block px-4 py-2 cursor-pointer"
                >
                  <p>خروج </p>
                </li>
              ) : null}
            </ul>
          </div>
          <Link href="/">
            <li className="mx-5 text-lg">خانه</li>
          </Link>
          <Link href="/authors">
            <li className="mx-5 text-lg">نویسندگان</li>
          </Link>
          <Link href={`${user ? "/Create-blog" : "/Login"}`}>
            <li className="mx-5 text-lg">نوشتن بلاگ</li>
          </Link>
        </ul>
        <Link href="/">
          <div>
            <Image alt="logo" src="/bloglogo.png" width={60} height={60} />
          </div>
        </Link>
      </div>
    </nav>
  );
}
