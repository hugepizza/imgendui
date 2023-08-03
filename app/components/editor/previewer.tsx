"use client";
import React, { ChangeEventHandler, useContext, useEffect } from "react";
import MarkdownIt from "markdown-it";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import { Bottom } from "./preview_botton";
import { essay } from "@/app/types/essay";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const mdParser = new MarkdownIt();

export default function Previewer({
  essay,
  background,
  goEdit,
}: {
  essay: essay;
  goEdit: () => void;
  background: string;
}) {
  return (
    <>
      <div
        className="flex w-full flex-grow "
        style={{ backgroundColor: background }}
      >
        <MdEditor
          className="flex w-full flex-grow"
          style={{ borderStyle: "none" }}
          renderHTML={(text) => mdParser.render(text)}
          view={{
            menu: false,
            md: false,
            html: true,
          }}
          value={essay.content}
        />
      </div>
      <Bottom pub={essay.content} view={essay.view || 0} edit={goEdit} />
    </>
  );
}
