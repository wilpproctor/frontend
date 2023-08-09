import Link from "next/link";
import FirstPageFooter from "../../components/FirstPageFooter";  
import Footer from "../../components/Footer";
import campus from "../../assets/campus.png";
import Image from "next/image";
import SuperProctorHeaderFirstPage from "../../components/SuperProctorHeaderFirstPage";

export default function Home() {
  return (<>
    <SuperProctorHeaderFirstPage buttonAvailable={"login"}/>
    <div className="flex justify-center items-center h-screen" style={{maxHeight: "75vh"}}>
      {/* <div className="flex gap-4">
        You are a:
        <div>
          <Link
            className="px-4 py-2 text-lg bg-blue-600 text-white rounded drop-shadow"
            href="/home"
          >
            Student
          </Link>
        </div>
      </div> */}
      <Image
          src={campus}
          alt="Picture of the author"
        //   width="200px"
        //   height="300px"
        />
    </div>
    <FirstPageFooter/>
    </>
  );
}


// export default function Home() {
//   return (<>
//     <FirstPageHeader/>
//    <ExamPage/>
//     <FirstPageFooter/>
//     </>
//   );
// }