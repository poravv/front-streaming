import { Container } from "react-bootstrap";
import { Buffer } from 'buffer';

const Destacados = ({ theme, destacados, destacadoHeader }) => {

  const viewImage = (html_image) => {
    if (html_image && typeof html_image !== "string") {
      //console.log(html_image);
      const asciiTraducido = Buffer.from(html_image?.data).toString('ascii');
      if (asciiTraducido) {
        return (
          <img
            alt="imagen"
            //preview={false}
            style={{ height:`170px`, borderRadius: `10px` }}
            src={asciiTraducido}
          />
        );
      }
    }
  }

  return (
    <div style={{ minHeight: `60%` }}>
      <hr style={{ width: "5%", height: "5px", backgroundColor: "#000339", margin: "0 auto", }} />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }} >
        <br />
        <h3 style={{ fontSize: "35px", fontWeight: "bold", color: `${theme?.content_title_color}`, my: 3 }}>
          {destacadoHeader?.title}
        </h3>
        <div>
          <h1
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: `${theme?.content_subtitle_color}`,
              textAlign: "center",
            }}
          >
            {destacadoHeader?.subtitle}
          </h1>
        </div>
        <div style={{ width: `100%`, marginTop: `4rem`, marginBottom: `4rem`,display:`flex` }}>
          <div className="row" style={{ cursor: "pointer",textAlign:`center` }}>
            {destacados?.map((data, index) => (
              <div key={index + 1} className="col" style={{ justifyContent: `center`, alignItems: `center`,marginTop:`2rem` }}>
                <a rel="noreferrer" href={`${data?.href}`} target="_blank" style={{ textDecoration: `none` }}>
                  {/*<img style={{ height: `170px`,borderRadius:`10px` }} src={data?.html_image} alt="" />*/}
                  {viewImage(data?.html_image)}
                  <h1 style={{ fontSize: "1em", color: `${theme?.content_title_color}`, }}>
                    {data?.title}
                  </h1>
                  <h1 style={{ fontWeight: "bold", fontSize: "14px", color: `${theme?.content_subtitle_color}` }}> Más detalles
                  </h1>
                </a>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </div>
  );
};

export default Destacados;
