"use client";
import React, { ChangeEventHandler, useContext, useEffect } from "react";
import MarkdownIt from "markdown-it";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";

import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import { Top } from "../../components/editor/top";
import { Footer } from "../../components/foot";
import { Bottom } from "../../components/editor/modify_bottom";
import { useRequest } from "ahooks";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { ThemeContext } from "../../contexts/theme_code";
import Editor from "../../components/editor/editor";
import useSWRMutation from "swr/mutation";
import { essay } from "@/app/types/essay";

export default function Edit() {
  const parts = usePathname().split("/");
  const essayUrl = parts[1];

  const { data, mutate } = useSWR(
    `https://api.imgen.space/api/c/${essayUrl}`,
    async (url: string) => {
      return (await axios.get<essay>(url)).data;
    }
  );

  const { trigger, isMutating } = useSWRMutation(
    `https://api.imgen.space/api/c/${essayUrl}`,
    async (url: string) => {
      const resp = await axios.post(
        `https://api.imgen.space/api/c/${essayUrl}`,
        {
          content: data?.content || "",
          newUrl: newUrl,
          code: code,
          newCode: newCode,
        }
      );
    }
  );

  const [code, setCode] = React.useState("");
  const [newCode, setNewCode] = React.useState("");
  const [newUrl, setNewUrl] = React.useState("");
  const router = useRouter();
  const theme = useContext(ThemeContext);

  function handleEditorChange({ html, text }: { html: string; text: string }) {
    mutate({ ...data, content: text }, false);
  }
  return (
    <div
      className="flex flex-col items-center justify-between  w-full h-screen px-40 p-2 mb-2"
      style={{ background: theme.background, color: theme.fontColor }}
    >
      <Editor
        content={data?.content || ""}
        handleEditorChange={handleEditorChange}
        background={theme.editBackground}
      ></Editor>
      <Bottom
        {...{
          save: () => {
            if (isMutating) {
              return;
            }
            trigger().then(() => {
              router.push(`/${newUrl ? newUrl : essayUrl}`);
            });
          },
          codeChange: setCode,
          newUrlChange: setNewUrl,
          newCodeChange: setNewCode,
        }}
      />
      <Footer />
    </div>
  );
}
