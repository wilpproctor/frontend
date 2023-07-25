import React from "react";

export default function Marking({ positive, negative=null }) {
  return (
    <div>
      <div className="flex flex-row gap-4">
        <span className="hover:bg-green-200 inline-block py-1 px-2 rounded bg-green-50 text-green-500 text-xs font-medium tracking-widest">
          {positive ? positive : 0} Marks
        </span>
        <span className="hover:bg-red-200 inline-block py-1 px-2 rounded bg-red-50 text-red-500 text-xs font-medium tracking-widest">
          {negative ? `-${negative} Marks` : "No Negative Marking"}
        </span>
      </div>
    </div>
  );
}
