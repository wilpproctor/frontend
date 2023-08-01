export default function Card(props) {
  const reflectionStyle = {
    WebkitTransform: "scaleY(-1)",
    MozTransform: "scaleY(-1)",
    OTransform: "scaleY(-1)",
    msTransform: "scaleY(-1)",
    transform: "scaleY(-1)",
  };
  const reflectionStyle1 = {
    WebkitTransform: "scaleY(1)",
    MozTransform: "scaleY(-1)",
    OTransform: "scaleY(-1)",
    msTransform: "scaleY(-1)",
    transform: "scaleY(-1) scaleX(-1)",
  };
  console.log(props);
  return (
    <div style={{padding: "40px"}}>
      <div
        style={{
          position: "relative",
          width: "300px",
          height: "250px",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          ...reflectionStyle,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "0%",
            left: "0%",
            width: "0",
            height: "0",
            borderTop: "150px solid transparent",
            borderRight: "150px solid #03dffc",
            transform: "scaleX(-1)scaleY(1)",
            opacity: "0.6",
            background: "linear-gradient(to bottom, #ff6f61 50%, #f0f0f0 50%)",
            height: "30%",
          }}
        >
            <div style={{zIndex: "2", marginTop: "-180px", ...reflectionStyle1}}>
            <div style={{marginTop:"30px", marginLeft: "-60px", fontSize: "25px", padding: "5px", fontFamily: "fantasy"}}>{props.company}</div>
              <div style={{marginBottom: "-20px", marginLeft: "-120px", fontSize: "25px",  padding: "5px", whiteSpace: "nowrap"}}>{props.subject}</div>
              <div style={{marginTop: "20px",marginBottom: "40px", marginLeft: "-20px", fontSize: "20px",  padding: "5px"}}>{props.exam_type}</div>
              </div>
          <div style={{ padding: "20px" }}>
            
            <div
              style={{ display: "flex", flexDirection: "column", zIndex: "2", position: "absolute" }}
            >
              
            </div>
          </div>
        </div>
        <div
          style={{
            height: "30%",
            bottom: 0,
            backgroundColor: "#0c52a8",
            width: "100%",
            color: "#ffffff",
            ...reflectionStyle,
            display: "flex",
            flexDirection: "column",
          }}
        >
        <div style={{padding: "5px"}}>{props.time}</div>
          <div style={{padding: "5px 5px 5px 2px"}}>{props.date}</div>
        </div>
      </div>
    </div>
  );
}
