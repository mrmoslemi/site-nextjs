import Link from "next/link";
import React from "react";

export default function Authors() {
  return (
    <div className="flex justify-center items-center w-full mt-20">
      <ul>
        <Link href="authors/1/articles">
          <li>هامون</li>
        </Link>
      
      </ul>
    </div>
  );
}
