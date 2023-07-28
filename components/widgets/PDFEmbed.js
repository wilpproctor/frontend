export default function PDFEmbed({ pdfURL, dimension="s"}) {
  return (
    <div className={dimension==="s" ? "h-[500px] w-[500px]" : "h-[700px] w-[600px]"}>
      <object
        data={pdfURL ? pdfURL : "http://africau.edu/images/default/sample.pdf"}
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <p>
          Alternative text - include a link{" "}
          <a href={pdfURL}>to the PDF!</a>
        </p>
      </object>
    </div>
  );
}
