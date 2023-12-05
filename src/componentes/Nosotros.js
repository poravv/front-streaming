import { Buffer } from 'buffer';

const Nosotros = ({ nosotros, theme }) => {
  //console.log(theme)
  const viewImage = (html_image) => {
    if (html_image && typeof html_image !== "string") {
      //console.log(html_image);
      const asciiTraducido = Buffer.from(html_image?.data).toString('ascii');
      if (asciiTraducido) {
        return (
          <img
            alt="imagen"
            className="image"
            //preview={false}
            style={{ minWidth:`170px`, borderRadius: `10px` }}
            src={asciiTraducido}
          />
          
        );
      }
    }
  }

  return (
    <div style={{ backgroundColor: `${theme?.content_background_color}`, }}>
      <hr style={{ width: "5%", height: "5px", backgroundColor: "#000339", margin: "0 auto", }} />
      <div style={{
        minHeight: `30rem`,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: `40px`,
        flexWrap: `wrap`,
        display: `flex`,
        margin: `2rem`,
      }} >
        {nosotros ?
          nosotros.map((data, index) => (
            <div className="row"
            key={index}
              style={{
                backgroundColor: `${data?.about_background !== "" ? data?.about_background : "#000339"}`,
                borderRadius: "15px",
                marginTop: `5px`
              }}>
              <div className="col"
                style={{
                  display: `flex`,
                  alignItems: "center",
                  justifyContent: "center",
                  margin: `2em`
                }}>
                <div className="col" >
                  <p className="row" style={{ fontSize: "35px", color: "white", fontWeight: "700" }}>
                    {data?.title}
                  </p>
                  <p className="row" style={{ fontSize: "16px", color: "#ccc", fontWeight: "500", my: 0 }}>
                    {data?.subtitle}
                  </p>

                  <p className="row" style={{ fontSize: "16px", color: "#ccc", fontWeight: "500", my: 3 }}>
                    {data?.description}
                  </p>
                </div>
              </div>
              {data?.html_image ?
                <div className="col contenedor"
                  style={{ height: `100%`,margin: `2em` }}
                >
                  {viewImage(data?.html_image)}
                </div>
                : null}
            </div>
          ))
          : null}

      </div>
    </div>
  );
};

export default Nosotros;
