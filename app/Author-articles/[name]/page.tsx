"use client";
import Blog from "@/components/blog";
import React from "react";
import { useState, useEffect } from "react";

export default function page({ params }: { params: { name: string } }) {
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
    <div className="flex w-full justify-center mt-20">
      <div className=" container">
        <div className=" text-3xl">بلاگ های {params.name}</div>
        {blogs.map((blog) =>
          blog.author == params.name ? (
            <Blog
              title={blog.title}
              desc={blog.desc}
              author={blog.author}
              url={blog.img}
              date={blog.date}
            />
          ) : null
        )}
      </div>
    </div>
  );
}
