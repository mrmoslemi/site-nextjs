"use client";
import TextEditor from "@/components/TextEditor";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function page() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [blog, setBlog] = useState({
    title: "",
    desc: "",
    author: "",
    img: "",
  });

  useEffect(() => {
    if (!user) {
      router.push("/Login");
    }
  }, []);

  const handleChange = (e: any) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/create-blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });
      setBlog({
        title: "",
        desc: "",
        author: "",
        img: "",
      });
      toast.success("بلاگ با موفقیت ایجاد شد!", {
        position: toast.POSITION.TOP_CENTER,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* <TextEditor /> */}
      <form
        onSubmit={submitHandler}
        className="container flex flex-col items-center justify-center my-20"
      >
        <input
          type="text"
          value={blog.author}
          onChange={handleChange}
          name="author"
          placeholder="نویسنده"
          className="w-full rounded-lg p-2 my-5 border"
        />
        <input
          type="text"
          value={blog.title}
          onChange={handleChange}
          name="title"
          placeholder="عنوان بلاگ"
          className="w-full rounded-lg p-2 my-5 border"
        />
        <textarea
          name="desc"
          value={blog.desc}
          onChange={handleChange}
          id="desc"
          cols={30}
          rows={10}
          placeholder="متن بلاگ شما..."
          className="border rounded-lg p-2 my-5 w-full"
        ></textarea>
        <input
          type="text"
          value={blog.img}
          onChange={handleChange}
          name="img"
          placeholder="آدرس عکس"
          className="w-full rounded-lg p-2 my-5 border"
        />
        <input
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]"
          type="file"
          id="formFile"
        />
        <button type="submit" className="px-10 py-3 rounded-lg border mt-5">
          ایجاد بلاگ
        </button>
      </form>
    </div>
  );
}
