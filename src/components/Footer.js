

import React, { Component } from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
class Footer extends Component {
  render() {
    return (
        <MDBFooter color="blue" className="font-small">
        <div className="footer-copyright text-center py-1">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright: <a href="http://www.RoniChabra.com" target="_blank"  rel="noopener noreferrer"> RoniChabra.com </a>
          </MDBContainer>
        </div>
      </MDBFooter>
    );
  }
}

export default Footer;
