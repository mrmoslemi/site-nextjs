import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div>بلاگ های هامون</div>
      <ul>
        <Link href="/authors/1/articles/1/edit">
          <li>1</li>
        </Link>
        <li>2</li>
        <li>3</li>
      </ul>
      <Link href="/authors/1/articles/create">
        <div className=" text-red-500 cursor-pointer">ایجاد بلاگ جدید</div>
      </Link>
    </div>
  );
}
