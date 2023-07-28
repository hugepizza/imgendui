"use client";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import "react-markdown-editor-lite/lib/index.css";

import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import { Footer } from "../components/foot";
import { useRequest } from "ahooks";
import axios from "axios";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const mdParser = new MarkdownIt();

export default function Preview() {
  const id = usePathname();
  const code = useSearchParams().get("code");
  const { data, error, loading } = useRequest(async () => {
    const resp = await axios.get<string>(
      `http://localhost:55327/api/c${id}?code=${code}`
    );
    return resp.data;
  });
  return (
    <div className="flex flex-col items-center justify-between  w-full h-screen ">
      {error && (
        <div className="flex justify-center items-center w-full h-full">
          Unauthorized
        </div>
      )}
      {!error && !loading && (
        <MdEditor
          className=" flex w-full flex-grow"
          renderHTML={(text) => mdParser.render(text)}
          view={{ menu: false, md: false, html: true }}
          value={data?.toString()}
          readOnly={true}
        />
      )}
      <Footer />
    </div>
  );
}
