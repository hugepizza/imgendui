"use client";
import React, { ChangeEventHandler, useContext, useEffect } from "react";
import MarkdownIt from "markdown-it";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import { Top } from "./top";
import { ThemeContext } from "../../contexts/theme_code";
export interface essay {
  content: string;
  url: string;
  code: string;
}
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const mdParser = new MarkdownIt();

export default function Editor({
  content,
  background,
  handleEditorChange,
  err,
}: {
  content: string;
  background: string;
  handleEditorChange?: ({ html, text }: { html: string; text: string }) => void;
  err?: boolean;
}) {
  const switchTab = (tab: string) => {
    setActive(tab);
  };
  const [active, setActive] = React.useState("Text");
  return (
    <>
      <Top cb={switchTab} />
      <div
        className="flex w-full flex-grow "
        style={
          err
            ? { borderLeft: "3px red solid", backgroundColor: background }
            : { backgroundColor: background }
        }
      >
        {active === "Text" ? (
          <MdEditor
            className="flex w-full flex-grow"
            style={{ borderStyle: "none" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            view={{
              menu: false,
              md: true,
              html: true,
            }}
            value={content}
          />
        ) : (
          <MdEditor
            className="flex w-full flex-grow "
            style={{ borderStyle: "none" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            view={{
              menu: false,
              md: true,
              html: true,
            }}
            value={`## Hello World ! 
### Here is a simple example which cant be edited`}
            readOnly={true}
          />
        )}
      </div>
    </>
  );
}
