import React from "react";
import "../styles/globals.css";
import MainNavigation from "@/components/MainNavigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "@/context/AuthContext";
interface Props {
  children?: any;
}

function layout({ children }: Props) {
  return (
    <html dir="rtl" lang="fa">
      <head>
        <title>Blog app!</title>
      </head>
      <body className=" font-Dana">
        <AuthContextProvider>
          <ToastContainer />
          <MainNavigation />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}

export default layout;
