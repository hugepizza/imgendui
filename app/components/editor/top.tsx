import React from "react";

export function Top({ cb }: { cb: (tab: string) => void }) {
  const [active, setActive] = React.useState("Text");
  return (
    <ul className="flex flex-wrap justify-start items-start w-full h-10">
      {["Text", "How"].map((item) => {
        return (
          <li
            key={item}
            onClick={() => {
              setActive(item);
              cb(item);
            }}
            style={active === item ? { background: "#FFF" } : {}}
            className="flex justify-center items-center text-center content-center h-full w-16"
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
