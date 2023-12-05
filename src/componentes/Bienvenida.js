import React from "react";
import { Button, Container } from "react-bootstrap";
import { Buffer } from 'buffer';

const Bienvenida = ({ welcome, theme }) => {

  const viewImage = (html_image) => {
    if (html_image && typeof html_image !== "string") {
      //console.log(html_image);
      const asciiTraducido = Buffer.from(html_image?.data).toString('ascii');
      if (asciiTraducido) {
        return (
          <img
            alt="imagen"
            style={{ width: "100%", marginBottom: "2rem", marginTop: "2rem", borderRadius: `20px` }}
            src={asciiTraducido}
          />
        );
      }
    }
  }

  return (
    <div style={{ backgroundColor: `${theme?.content_background_color}`, }}>
      <div style={{ minHeight: "90vh", display: `flex` }}>
        <Container style={{ marginLeft: `2rem`, marginTop: `1rem` }}>
          <div className="row">
            <div className="col-md-5" >
              <h3 style={{ color: `${theme?.content_title_color}` }}>{welcome?.title}</h3>
              <h2 style={{ fontSize: `50px`, display: `flex`, color: `${theme?.content_subtitle_color}` }}><b>{welcome?.subtitle}</b></h2>
              <p style={{ fontSize: "16px", color: `${theme?.content_description_color}` }}>{welcome?.description}</p>
              <a rel="noreferrer" href={welcome?.button_href} target="_blank" style={{ textDecoration: `none` }}>
                <Button style={{ border: `none`, background: `${theme?.content_button_color}`, color: `${theme?.button_text_color}`, marginBottom: `20px` }}>
                  {welcome?.button_label}
                </Button>
              </a>
            </div>
            <div className="col-md-7" >
              {viewImage(welcome?.html_image)}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Bienvenida;
