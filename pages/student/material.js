import ExcelSheet from "@/components/widgets/ExcelSheet";
import PDFEmbed from "@/components/widgets/PDFEmbed";
import React from "react";


const data = [
  {
    key: 1,
    file_name: "organic.pdf",
    format: "pdf",
    url: "http://africau.edu/images/default/sample.pdf"
  },
  {
    key: 2,
    file_name: "metallurgy.jpeg",
    format: "img",
    url: "https://images.unsplash.com/photo-1452022449339-59005948ec5b?auto=format&q=75&fit=crop&w=600"
  }
];

const icons = {
  "pdf": "https://upload.wikimedia.org/wikipedia/commons/3/38/Icon_pdf_file.svg",
  "img": "https://icon-library.com/images/image-file-icon/image-file-icon-8.jpg"
}
export default function StudyMaterial() {
  // {URL, format}
  const [displayMaterial, setDisplayMaterial] = React.useState({ format: "img", url: "https://images.unsplash.com/photo-1452022449339-59005948ec5b?auto=format&q=75&fit=crop&w=600" });

  const displayHandler = (key) => {
    let obj = data.find(o => o.key === key);
    setDisplayMaterial(obj);
  }


  const materialDisplay = ({ file_name, format, url }) => {
    if (format === "pdf") {
      return (
        <PDFEmbed pdfURL={url} dimension="xl" />
      );
    }
    return (
      <div className="h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg sm:rounded-none sm:shadow-none md:h-auto">
      <ExcelSheet />
   
      <img
    // "https://images.unsplash.com/photo-1452022449339-59005948ec5b?auto=format&q=75&fit=crop&w=600"
      src= {url}
      loading="lazy"
      alt="Photo by Jeremy Cai"
      className="h-full w-full object-cover object-center"
    />
  </div>
    )
  };

  return (
    <div className="py-12">
      <div className="bg-white py-6 sm:py-0">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-12">
            {materialDisplay(displayMaterial)}

            <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32 xl:py-64">
              <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">
                Click to preview
              </p>
              <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl">
                Your Materials
              </h1>

              {/* <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">
                PDF and JPEG
              </p> */}




              <div className="flex flex-row">
                {data.map(
                  (file, i) => (
                    <div onClick={() => displayHandler(file.key)} key={i} className="flex flex-col items-center gap-3 m-2">
                      <img src={icons[file.format]} width="70px" height="70px"></img>
                      <p className="mb-4 text-center text-gray-500 sm:text-left md:text-lg">
                        {file.file_name}
                      </p>
                    </div>
                  )
                )}
              </div>

              <a
                href="#"
                className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
              >
                Upload Files(Disabled during exam)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
