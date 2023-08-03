"use client";

import { createContext, useState } from "react";

export interface theme {
  background: string;
  editBackground: string;
  fontColor: string;
}

const light: theme = {
  background: "#edeef0",
  editBackground: "#ffffff",
  fontColor: "#000000",
};

const dark: theme = {
  background: "#1c1c1c",
  editBackground: "#262626",
  fontColor: "#b7b7b7",
};

export const ThemeContext = createContext(light);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(light);
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
