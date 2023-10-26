"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const [blog, setBlog] = useState<any>({});

  const src = blog.img;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3000/api/get-blogs/${params.id}`
      );
      const json = await response.json();
      setBlog(json);
    }
    fetchData();
  }, []);

  const handleDelete = async (e: any) => {
    try {
      await fetch(`http://localhost:3000/api/delete-blogs/${params.id}`, {
        method: "DELETE",
      });
      toast.success("بلاگ با موفقیت حذف شد!", {
        position: toast.POSITION.TOP_CENTER,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full h-full flex flex-col items-center mt-10 container">
        <div className="mb-10">
          <Image
            loader={() => src}
            src={src}
            width={1000}
            height={20}
            alt="blog image"
          />
        </div>
        <h1 className="text-4xl font-semibold mb-5">{blog.title}</h1>
        <p className="text-xl mb-5">{blog.desc}</p>
        <Link href={`/Author-articles/${blog.author}`}>
          <p className="italic mb-5">Written by {blog.author}</p>
        </Link>
        {user?.role === "admin" ? (
          <>
            <Link href={`/Edit-blog/${blog._id}`}>
              <p>ویرایش بلاگ</p>
            </Link>
            <span onClick={handleDelete}>
              <Image
                alt="trash"
                className="my-5"
                src="/trash.svg"
                width={40}
                height={40}
              />
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}
