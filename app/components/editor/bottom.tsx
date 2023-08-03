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
    <div className="flex flex-row justify-start items-start w-1/2 mt-3 text-center h-8">
      <div
        className="flex justify-center items-center h-full w-16 mr-1 bg-white self-start"
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
      <input
        className="flex h-full px-2 mx-1 border-none outline-none min-w-0 self-start"
        placeholder="Code"
        onChange={(e) => codeChange(e.target.value)}
      ></input>
      <input
        className="flex h-full  px-2 ml-1 border-none outline-none min-w-0 self-start"
        placeholder="Url"
        onChange={(e) => urlChange(e.target.value)}
      ></input>
    </div>
  );
}
