import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Blog({ title, desc, author, url, date }: any) {
  const src = url;
  const standardDate = new Date(date);
  const shamsiDate = new Intl.DateTimeFormat("fa-IR").format(standardDate);
  console.log(shamsiDate);

  return (
    <div className=" w-full h-64  flex justify-end my-10 rounded-lg overflow-hidden shadow-lg">
      <div className="w-64 h-64 bg-slate-200 relative">
        <Image loader={() => src} src={src} fill alt="blog image" />
      </div>
      <div className="flex flex-col text-justify px-10 py-10 flex-1">
        <div className=" font-bold text-2xl">{title}</div>
        <div>{desc}</div>
        <Link href={`/Author-articles/${author}`}>
          <div className=" text-slate-300 mt-4">{author}</div>
        </Link>
        <span className="text-slate-300">{shamsiDate}</span>
      </div>
    </div>
  );
}
