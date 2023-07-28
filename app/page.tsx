"use client";
import React, { ChangeEventHandler, useEffect } from "react";
import * as ReactDOM from "react-dom";
import MarkdownIt from "markdown-it";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { v4 as uuidv4 } from "uuid";

import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import { Top } from "./components/editor/top";
import { Footer } from "./components/foot";
import { Bottom } from "./components/editor/bottom";
import { useRequest } from "ahooks";
import axios from "axios";
export interface essay {
  content: string;
  url: string;
  code: string;
}
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const mdParser = new MarkdownIt();

export default function Home() {
  const switchTab = (tab: string) => {
    setActive(tab);
  };
  const { run } = useRequest(
    async (essay: essay) => {
      await axios.post(`https://api.imgen.space/api/c/${essay.url}`, {
        ...essay,
      });
    },
    { manual: true }
  );
  const [active, setActive] = React.useState("Text");
  const [content, setContent] = React.useState("");
  const [code, setCode] = React.useState("");
  const [url, setUrl] = React.useState("");

  function handleEditorChange({ html, text }: { html: string; text: string }) {
    setContent(text);
    console.log("handleEditorChange", html, text);
  }
  function go() {
    run({
      content: content,
      code: code,
      url: url || uuidv4(),
    });
  }
  return (
    <>
      <div className="flex flex-col items-center justify-between  w-full h-screen ">
        <Top cb={switchTab} />
        <div className="flex w-full flex-grow bg-white bor">
          {active === "Text" ? (
            <MdEditor
              className=" flex w-full flex-grow"
              style={{ borderStyle: "none" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              view={{ menu: false, md: true, html: true }}
              value={content}
            />
          ) : (
            <MdEditor
              className="border-none flex w-full flex-grow "
              style={{ borderStyle: "none" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              view={{ menu: false, md: true, html: true }}
              value={`## Hello World ! 
### Here is a simple example which cant be edited`}
              readOnly={true}
            />
          )}
        </div>
      </div>
      <Bottom
        {...{
          go: go,
          codeChange: setCode,
          urlChange: setUrl,
        }}
      />
      <Footer />
    </>
  );
}
