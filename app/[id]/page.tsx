"use client";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import "react-markdown-editor-lite/lib/index.css";

import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import { Footer } from "../components/foot";
import puppeteer from "puppeteer";
import { useRequest } from "ahooks";
import axios from "axios";
import { essay } from "../page";
const MdEditorPreview = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const mdParser = new MarkdownIt();

export default function Preview() {
  const router = useRouter();
  const id = usePathname();
  const code = useSearchParams().get("code");
  const { data: context, error } = useRequest(async () => {
    const resp = await axios.get<string>(
      `http://localhost:56321/api/c${id}?code=${code}`
    );
    return resp.data;
  });
  return (
    <div className="flex flex-col items-center justify-between  w-full h-screen ">
      {error && <div className="flex justify-center items-center w-full h-full">Unauthorized</div>}
      {!error && (
        <MdEditorPreview
          className=" flex w-full flex-grow"
          renderHTML={(text) => mdParser.render(text)}
          view={{ menu: false, md: false, html: true }}
          value={context}
          readOnly={true}
        />
      )}
      <Footer />
    </div>
  );
}
