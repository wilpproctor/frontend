import PDFEmbed from "../widgets/PDFEmbed";

export default function MCQ({ question, options, marks, negativeMarking }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="text-center mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                {question.heading}
              </h1>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                {question.text}?
              </p>
            </div>
            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              {options.map((option, i) => (
                <div className="p-2 sm:w-1/2 w-full" key={i}>
                  <div className="bg-gray-100 hover:bg-indigo-100 rounded flex p-4 h-full items-center cursor-pointer">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                      <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <span className="title-font font-medium">{option}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-16">
              <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Previous
              </button>
              <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg ml-4">
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
      {/* <div>
        <PDFEmbed pdfURL={"https://africau.edu/images/default/sample.pdf"} />
      </div> */}
    </div>
  );
}
