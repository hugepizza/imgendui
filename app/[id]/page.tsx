"use client";
import React, { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";

import "react-markdown-editor-lite/lib/index.css";

import "react-markdown-editor-lite/lib/index.css";
import { Footer } from "../components/foot";
import axios from "axios";
import { ThemeContext } from "../contexts/theme_code";
import Previewer from "../components/editor/previewer";
import useSWR from "swr";
import { essay } from "@/app/types/essay";

export default function Preview() {
  const id = usePathname();
  const theme = useContext(ThemeContext);
  const router = useRouter();
  const { data } = useSWR(
    `https://api.imgen.space/api/c${id}`,
    async (url: string) => {
      const resp = await axios.get<essay>(url);
      return resp.data;
    }
  );
  return (
    <div
      className="flex flex-col items-center justify-between  w-full h-screen px-40 p-2 mb-2"
      style={{ background: theme.background, color: theme.fontColor }}
    >
      <Previewer
        essay={data || ({} as essay)}
        background={theme.editBackground}
        goEdit={() => {
          router.push(`${id}/edit`);
        }}
      ></Previewer>
      <Footer />
    </div>
  );
}
