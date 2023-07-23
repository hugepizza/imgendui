import { useState } from "react";

export function Bottom({
  go,
  codeChange,
  urlChange,
}: {
  go: () => void;
  codeChange: (code: string) => void;
  urlChange: (url: string) => void;
}) {
  const [goColor, setGoCoolor] = useState("white");
  return (
    <div className="flex flex-col flex-wrap justify-start items-start w-full h-10 mt-3 text-center">
      <div
        className="flex justify-center items-center h-full w-16 bg-white"
        style={{ backgroundColor: goColor }}
        onClick={go}
        onMouseEnter={() => {
          setGoCoolor("gray");
        }}
        onMouseLeave={() => {
          setGoCoolor("white");
        }}
      >
        Go
      </div>
      <div className="flex flex-row justify-center items-center h-full justify-self-end">
        <input
          className="h-full mx-4 px-2 border-none"
          placeholder="Code"
          onChange={(e) => codeChange(e.target.value)}
        ></input>
        <input
          className="h-full px-2 border-none"
          placeholder="Url"
          onChange={(e) => urlChange(e.target.value)}
        ></input>
      </div>
    </div>
  );
}
