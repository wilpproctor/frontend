import React from "react";
import { mhchemParser } from "mhchemparser";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

const exampleArray = [
  { id: 1, v: "CO2 + C -> 2 CO" },
  { id: 2, v: "Sb2O3" },
  { id: 3, v: "CrO4^2-" },
  { id: 4, v: "1/2 H2O" },
  { id: 5, v: "^227_90Th+" },
  { id: 6, v: "H^3HO" },
  { id: 7, v: "A <-> B" },
  { id: 8, v: "A <--> B" },
  { id: 9, v: "A <=> B" },
  { id: 10, v: "A ->[H2O] B" },
  { id: 11, v: "A ->[{text above}][{text below}] B" },
  { id: 12, v: "A ->[$x$][$x_i$] B" },
  { id: 13, v: "(NH4)2S" },
  { id: 14, v: "CH4 + 2 (O2 + 79/21 N2)" },
  { id: 15, v: "CO3^2-_{(aq)}" },
  { id: 16, v: "NaOH(aq,\\ \\infty)" },
  { id: 17, v: "ZnS($c$)" },
  { id: 18, v: "ZnS(\\ \\ca $c$)" },
  { id: 19, v: "NO_x" },
  { id: 20, v: "Fe^n+" },
  { id: 21, v: "x Na(NH4)HPO4 ->[\\ \\Delta] (NaPO3)_x + x NH3 ^ + x H2O" },
  { id: 22, v: "\\ \\beta +" },
  { id: 23, v: "\\ \\gamma " },
  { id: 24, v: "\\gamma" },
  { id: 25, v: "Fe(CN)_{\\frac{6}{2}}" },
  { id: 26, v: "$cis${-}[PtCl2(NH3)2]" },
  { id: 27, v: "{Gluconic Acid} + H2O2" },
  { id: 28, v: "A\\bond{1}B\\bond{2}C\\bond{3}D" },
  { id: 29, v: "A->B<-C" },
  { id: 30, v: "KCr(SO4)2*12H2O" },
  { id: 31, v: "Fe^{II}Fe^{III}2O4" },
  { id: 32, v: "OCO^{.-}" },
  { id: 33, v: "A + B" },
  { id: 34, v: "A v B (v) -> B ^ B (^)" },
  {
    id: 35,
    v:
      "Zn^2+<=>[+ 2OH-][+ 2H+]\\underset{\\text{amphoteres Hydroxid}}{Zn(OH)2 v}<=>[+ 2OH-][+ 2H+]  \\underset{\\text{Hydroxozikat}}{[Zn(OH)4]^2-}"
  }
];

const Single = ({ Value }) => {
  let ch = Value.replaceAll("<=>", "\\leftrightharpoons ");
  ch = ch.replaceAll("<-->", "\\leftrightarrows");
  ch = ch.replaceAll("<=>>", "\\leftrightharpoons ");

  let chemParse = mhchemParser.toTex(ch, "ce");
  // return <InlineMath math={chemParse} />;
  return (
    <div className="border p-2 w-full">
      <h2>{Value}</h2>
      <InlineMath math={chemParse} />
    </div>
  );
};

const Example = () => {
  return (
    <div>
      <h1 className="text-xl">Example Set</h1>
      <p>note: instead of "/" given in examples use "//"</p>
      {exampleArray.map(exm => {
        return <Single Value={exm.v} key={exm.id} />;
      })}
    </div>
  );
};

export default Example;