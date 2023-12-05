import { Container, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Footer = ({ theme, footerHeader, footerLabel,footerIcon }) => {
  const styleFooter = (
    (theme?.footer_background_color1 === null || theme?.footer_background_color2 === '') ?
        {
            position: "initial",
            backgroundColor: `${theme?.footer_background_color1}`,
            width: `100%`
        }
        :
        {
            position: "initial",
            backgroundImage: `linear-gradient(50deg,${theme?.footer_background_color1},${theme?.footer_background_color2})`,
            width: `100%`
        }

)
  return (
    <div style={styleFooter}>
      <Container>
        <div className='row' style={{ minHeight: `200px` }}>
          <hr />
          <div className='col'>
            <p style={{ fontSize: "16px", color: `${theme?.footer_title_color}`, fontWeight: "700", }}>
              {footerHeader?.label1}
            </p>
            {footerLabel ?
              footerLabel.map((data,index) => (
                <p key={index+1}>
                  <a style={{ textDecoration: `none`, color: `${theme?.footer_title_color}` }} href={`${data?.href}`} target="_black">
                    {data?.description}
                  </a>
                </p>
              ))
              : null}
              <Nav.Link as={Link} to='/login' style={{textDecoration: `none`, color: `${theme?.footer_title_color}`}} >Login</Nav.Link>
          </div>
          <div className='col'>
            <p style={{ fontSize: "16px", color: `${theme?.footer_title_color}`, fontWeight: "bold", }}>
              {footerHeader?.label2}
            </p>
            <div>
            {footerIcon?
            footerIcon.map((data,index) => (
              <a key={index+1} style={{ fontSize: `20px`, color: `${theme?.footer_icon_color}`, margin: `10px` }} rel="noreferrer" target="_blank" href={`${data?.href}`}>
                <i className={`${data?.name}`} ></i>
              </a>
            ))
            :null}
              
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
