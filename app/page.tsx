"use client";
import React, { ChangeEventHandler, useContext, useEffect } from "react";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { v4 as uuidv4 } from "uuid";

import "react-markdown-editor-lite/lib/index.css";
import { Footer } from "./components/foot";
import { Bottom } from "./components/editor/bottom";
import { useRequest } from "ahooks";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ThemeContext } from "./contexts/theme_code";
import Editor from "./components/editor/editor";
import { essay, essayInit, essayUpdate } from "@/app/types/essay";

export default function Home() {
  const { run, loading } = useRequest(
    async (essay: essayInit) => {
      const resp = await axios.post<string>(`https://api.imgen.space/api/c`, {
        ...essay,
      });
      return resp.data;
    },
    {
      manual: true,
      onSuccess: (result, params) => {
        router.push(`/${result}`);
      },
    }
  );
  const [content, setContent] = React.useState("");
  const [code, setCode] = React.useState("");
  const [url, setUrl] = React.useState("");
  const router = useRouter();
  const theme = useContext(ThemeContext);

  function handleEditorChange({ html, text }: { html: string; text: string }) {
    setContent(text);
  }
  function go() {
    if (loading) {
      return;
    }
    run({
      content: content,
      code: code,
      url: url,
    });
  }
  return (
    <div
      className="flex flex-col w-full h-screen px-40 p-2 mb-2"
      style={{ background: theme.background, color: theme.fontColor }}
    >
      <Editor
        content={content}
        handleEditorChange={handleEditorChange}
        background={theme.editBackground}
      ></Editor>
      <Bottom
        {...{
          go: go,
          codeChange: setCode,
          urlChange: setUrl,
        }}
      />
      <Footer />
    </div>
  );
}
