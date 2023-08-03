import { useState } from "react";

export function Bottom({
  pub,
  view,
  edit,
}: {
  pub: string;
  view: number;
  edit: () => void;
}) {
  const [goColor, setGoCoolor] = useState("white");
  return (
    <div className="flex flex-col flex-wrap justify-start items-start w-full h-8 mt-3 text-center">
      <div
        className="flex justify-center items-center h-full w-16 bg-white self-start"
        style={{ backgroundColor: goColor }}
        onMouseEnter={() => {
          setGoCoolor("gray");
        }}
        onMouseLeave={() => {
          setGoCoolor("white");
        }}
        onClick={() => {
          edit();
        }}
      >
        Edit
      </div>
      <div className="flex flex-col justify-center items-center h-full self-end">
        <time suppressHydrationWarning>Pub: {pub}</time>
        <div className="self-end">View: {view}</div>
      </div>
    </div>
  );
}
