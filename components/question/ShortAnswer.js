import { useState } from "react";
import Diagram from "@/widgets/Diagram";
import Script from 'next/script';
import PDFEmbed from "@/widgets/PDFEmbed";
import Marking from "./Marking";
import Dictaphone from "./Dictaphone";


export default function ShortAnswer() {
  const [answer, setAnswer] = useState("");

  const handleChange = event => {
    console.log(event?.target.value)
    setAnswer(event?.target.value)
  }
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 md:flex-row flex-col items-start">
          <div className="lg:flex-grow md:w-1/2 pr-16 pl-3 mt-10 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Short Answer Question
            </h1>
            <Marking positive="4" />
            <p className="mt-2 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="flex flex-col w-full gap-5 justify-start items-stretch">
              <div>
                <label
                  htmlFor="hero-field"
                  className="leading-7 text-gray-600"
                >
                  Enter your answer in 200 words:
                </label>
                <textarea
                  type="text"
                  id="hero-field"
                  name="hero-field"
                  rows="5"
                  className="w-full my-2 bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={answer}
                  onChange={() => handleChange()}
                ></textarea>
              </div>
              <div className="flex flex-col items-stretch">
                <p className="text-gray-600">Enter mathematical formulae:</p>
                <Script src="//unpkg.com/mathlive" />
                <math-field
                  style={{
                    verticalAlign: "middle",
                    borderRadius: "4px",
                    border: "1px solid rgba(0, 0, 0, .3)",
                    padding: "5px",
                    margin: "5px",
                    width: "100%",
                    height: "80px"
                  }}
                ></math-field>
              </div>
            </div>
            <Dictaphone outputUpdater={setAnswer}/>
            <p className="text-sm mt-4 text-gray-500 mb-4 w-full">
              Note: You can resize the answer area by dragging it.
            </p>

            <div className="flex lg:flex-row md:flex-col">
              <button className="hover:bg-indigo-100 bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                <span className="title-font font-medium">Previous</span>
              </button>
              <button className="hover:bg-indigo-100 bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center lg:ml-4 md:ml-0 ml-4 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none">
                <span className="title-font font-medium">Next</span>
              </button>
            </div>
          </div>

          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mt-10">
            <Diagram
              url={
                "https://images.edrawmax.com/images/knowledge/mechanics-diagram-example01.jpg"
              }
            />
            <br />
            {/* <PDFEmbed pdfURL={"http://africau.edu/images/default/sample.pdf"} /> */}
          </div>
        </div>
      </section >
      <div className="m-4">
        <hr style={{ borderWidth: "1px" }} />
      </div>
    </div >
  );
}
