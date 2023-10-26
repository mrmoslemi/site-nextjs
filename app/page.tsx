"use client";
import Blog from "@/components/blog";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Skeleton } from "@mui/material";

function page() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/api/get-blogs");
      const json = await response.json();
      setBlogs(json);
    }
    fetchData();
  }, []);

  return (
    <div className=" w-full h-full flex justify-center items-center ">
      <div className="flex items-center justify-center p-4"></div>
      <div className=" w-full h-full container ">
        <h2 className="text-4xl mt-10">مقالات</h2>
        {blogs ? (
          blogs.length ? (
            blogs.map((blog) => (
              <Link href={`/Blogs/${blog._id}`} key={blog._id}>
                <Blog
                  title={blog.title}
                  desc={blog.desc}
                  author={blog.author}
                  url={blog.img}
                  id={blog._id}
                  date={blog.date}
                />
              </Link>
            ))
          ) : (
            <div className="mt-10">
              <div className="mb-14">
                <Skeleton variant="circular" width={60} height={60} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </div>
              <div className="mb-14">
                <Skeleton variant="circular" width={60} height={60} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </div>
              <div className="mb-14">
                <Skeleton variant="circular" width={60} height={60} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </div>
              <div className="mb-14">
                <Skeleton variant="circular" width={60} height={60} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </div>
            </div>
          )
        ) : (
          <>
            <div className="mt-5">مقاله ای برای نمایش وجود ندارد.</div>
            <Link href="/Create-blog">
              <p className=" text-red-600">ایجاد مقاله جدید؟</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default page;
