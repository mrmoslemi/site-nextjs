import React from "react";

export default function BlogPart(props: {
  submitHandler: any;
  blog: any;
  handleChange: any;
}) {
  return (
    <form
      onSubmit={props.submitHandler}
      className="container flex flex-col items-center justify-center my-20"
    >
      <input
        required
        type="text"
        value={props.blog.author}
        onChange={props.handleChange}
        name="author"
        placeholder="نویسنده"
        className="w-full rounded-lg p-2 my-5 border"
      />
      <input
        required
        type="text"
        value={props.blog.title}
        onChange={props.handleChange}
        name="title"
        placeholder="عنوان بلاگ"
        className="w-full rounded-lg p-2 my-5 border"
      />
      <textarea
        required
        name="desc"
        value={props.blog.desc}
        onChange={props.handleChange}
        id="desc"
        cols={30}
        rows={10}
        placeholder="متن بلاگ شما..."
        className="border rounded-lg p-2 my-5 w-full"
      ></textarea>
      <input
        required
        type="text"
        value={props.blog.img}
        onChange={props.handleChange}
        name="img"
        placeholder="آدرس عکس"
        className="w-full rounded-lg p-2 my-5 border"
      />
      <input
        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]"
        type="file"
        id="formFile"
      />
      <button
        type="submit"
        className="px-10 py-3 rounded-lg border mt-5 hover:shadow-lg duration-75 transition-all ease-in-out"
      >
        اعمال تغییرات
      </button>
    </form>
  );
}
