import React, { useState } from "react";
import Example from "./Example";
import reactStringReplace from "react-string-replace";
import { mhchemParser } from "mhchemparser";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

const InputViewer = () => {
  const [inputValue, setInputValue] = useState(
    "Use quotes for Chemical `CO2 + C -> 2 CO` equation.\n Click on info button in bottom-left corner for example set"
  );
  const [edit, setEdit] = useState(true);
  const [info, setInfo] = useState(true);
  console.log(edit, info);
  const widthChanger = () => {
    if (edit && info) {
      return " w-1/3 border";
    } else if (edit || info) {
      return " w-1/2 border";
    } else {
      return " ";
    }
  };

  const chemValues = S => {
    S = S.replaceAll("<=>", "\\leftrightharpoons ");
    S = S.replaceAll("<-->", "\\leftrightarrows");
    const reg = new RegExp("`([^`]*)`");
    const Answer = reactStringReplace(S, reg, (matchedString, i) => {
      let chemParse = mhchemParser.toTex(matchedString, "ce");
      return <InlineMath math={chemParse} />;
    });

    return Answer;
  };
  return (
    <div className="flex h-[800px] w-full relative">
      <div className={"h-[800px] p-4 text-clip" + widthChanger()}>
        {inputValue && <span>{chemValues(inputValue)}</span>}
      </div>
      {edit && (
        <div className={"h-[800px] p-4" + widthChanger()}>
          <textarea
            type="text"
            className="w-full border rounded px-2 py-1 h-full"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </div>
      )}
      {info && (
        <div className={"h-[800px] p-4 text-clip overflow-auto" + widthChanger()}>
          <Example />
        </div>
      )}
      <div className="absolute bottom-0 inline-flex rounded-md shadow-sm">
        <button
          type="button"
          className="bg-blue-200 py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text--400 sm:p-4"
          onClick={() => setEdit(v => !v)}
        >
          Edit
        </button>
        <button
          type="button"
          className="bg-blue-200 py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 sm:p-4"
          onClick={() => setInfo(v => !v)}
        >
          Info
        </button>
      </div>
    </div>
  );
};

export default InputViewer;
