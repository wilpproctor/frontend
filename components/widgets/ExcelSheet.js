import {useState, useMemo} from 'react'
//import Spreadsheet from "react-spreadsheet";

const ExcelSheet = () => {
  const [data, setData] = useState([
    [{ value: "Vanilla" }, { value: "Chocolate" }]
  ]);
  return <div>
   {/*<Spreadsheet data={data} onChange={setData} /> */}
  </div>
}

export default ExcelSheet;