import React, { Component } from "react";
import { connect } from "react-redux";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBTooltip,
  MDBBtn
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <Router>
        <MDBNavbar color="default-color" dark expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">Scheduler</strong>
          </MDBNavbarBrand>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink
                className="waves-effect waves-light signOut"
                to=""
                onClick={() => this.props.LOGGED_IN(false)}
              >
                <MDBTooltip placement="left">
                  <MDBBtn>
                    <i className="fas fa-sign-out-alt" />
                  </MDBBtn>
                  <div>Sign out!</div>
                </MDBTooltip>
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBNavbar>
      </Router>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    LOGGED_IN: bool => dispatch({ type: "LOGGED_IN", data: bool })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
