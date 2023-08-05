"use client";
import React, { ChangeEventHandler, useContext, useEffect } from "react";
import "react-markdown-editor-lite/lib/index.css";
import useSWR from "swr";

import "react-markdown-editor-lite/lib/index.css";
import { Footer } from "../../components/foot";
import { Bottom } from "../../components/editor/modify_bottom";
import { useRequest } from "ahooks";
import axios, { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { ThemeContext } from "../../contexts/theme_code";
import Editor from "../../components/editor/editor";
import { essay, essayUpdate } from "@/app/types/essay";

export default function Edit() {
  const parts = usePathname().split("/");
  const essayUrl = parts[1];

  const { data, mutate } = useSWR(
    `https://api.imgen.space/api/c/${essayUrl}`,
    async (url: string) => {
      return (await axios.get<essay>(url)).data;
    }
  );

  const { run, loading } = useRequest(
    async (essay: essayUpdate) => {
      const resp = await axios.post<string>(
        `https://api.imgen.space/api/c/${essayUrl}`,
        essay
      );
      return resp.data;
    },
    {
      manual: true,
      onSuccess: () => {
        router.push(`/${newUrl ? newUrl : essayUrl}`);
      },
      onError(e) {
        if (e instanceof AxiosError) {
          if (e.response?.status === 401) {
            setCodeErr(true);
          }
          if (e.response?.status === 404) {
            setUrlExist(true);
          }
          if (e.response?.status === 400) {
            setEditorErr(true);
          }
        }
      },
    }
  );

  const [code, setCode] = React.useState("");
  const [newCode, setNewCode] = React.useState("");
  const [newUrl, setNewUrl] = React.useState("");
  const router = useRouter();
  const theme = useContext(ThemeContext);
  const [urlExist, setUrlExist] = React.useState(false);
  const [codeErr, setCodeErr] = React.useState(false);
  const [editorErr, setEditorErr] = React.useState(false);

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
        err={editorErr}
      ></Editor>
      <Bottom
        {...{
          save: () => {
            if (loading) {
              return;
            }
            run({
              content: data?.content || "",
              newUrl: newUrl,
              code: code,
              newCode: newCode,
            });
          },
          codeChange: setCode,
          newUrlChange: setNewUrl,
          newCodeChange: setNewCode,
          codeErr: codeErr,
          newUrlErr: urlExist,
        }}
      />
      <Footer />
    </div>
  );
}
