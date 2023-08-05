import { useState } from "react";

export function Bottom({
  save,
  codeChange,
  newUrlChange,
  newCodeChange: newcodeChange,
  codeErr,
  newUrlErr,
}: {
  save: () => void;
  codeChange: (code: string) => void;
  newUrlChange: (url: string) => void;
  newCodeChange: (url: string) => void;
  codeErr?: boolean;
  newUrlErr?: boolean;
}) {
  const [goColor, setGoCoolor] = useState("white");
  return (
    <div className="flex flex-col flex-wrap justify-start items-start w-full mt-3 text-center">
      <div className="flex flex-row justify-center items-center  w-full">
        <input
          className="flex h-8 mr-1 px-2 border-none outline-none flex-1 min-w-0"
          style={codeErr ? { borderLeft: "3px solid red" } : {}}
          placeholder="Enter edit code"
          onChange={(e) => codeChange(e.target.value)}
        ></input>
        <input
          className="flex h-8 mx-2 px-2 border-none outline-none flex-1 min-w-0"
          placeholder="New edit code - optional"
          onChange={(e) => newcodeChange(e.target.value)}
        ></input>
        <input
          className="flex h-8 ml-1 px-2 border-none outline-none flex-1 min-w-0"
          style={newUrlErr ? { borderLeft: "3px solid red" } : {}}
          placeholder="New url - optional"
          onChange={(e) => newUrlChange(e.target.value)}
        ></input>
      </div>
      <div className="flex flex-row justify-start items-center w-full mt-2">
        <div
          className="flex justify-center items-center h-8 w-16  bg-white self-start"
          style={{ backgroundColor: goColor }}
          onClick={save}
          onMouseEnter={() => {
            setGoCoolor("gray");
          }}
          onMouseLeave={() => {
            setGoCoolor("white");
          }}
        >
          Save
        </div>
      </div>
    </div>
  );
}
