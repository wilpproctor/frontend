import React from "react";

export default function Diagram({ url }) {
  return (
    <div>
      <img
        className="object-cover object-center rounded w-[500px] h-[500px] border-4"
        alt="hero"
        src={url ? "https://images.edrawmax.com/images/knowledge/mechanics-diagram-example01.jpg" : null}
      />
    </div>
  );
}
