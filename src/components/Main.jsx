import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import RegisterUserForm from "./RegisterUserForm";
import Calendar from "./Calendar";
import {
  MDBContainer,
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "1"
    };
  }

  toggleNav = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <Header />
        <BrowserRouter>
          <MDBContainer>
            <p className="hello">
              Hello <span className="bold">{user.name}</span>
            </p>
            <MDBNav className="nav-tabs mt-4">
              <MDBNavItem>
                <MDBNavLink
                  to="#"
                  active={this.state.activeItem === "1"}
                  onClick={this.toggleNav("1")}
                  role="tab"
                >
                  Rooms
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to="#"
                  active={this.state.activeItem === "2"}
                  onClick={this.toggleNav("2")}
                  role="tab"
                >
                  Create users
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBTabContent activeItem={this.state.activeItem}>
              <MDBTabPane tabId="1" role="tabpanel">
                <Calendar />
              </MDBTabPane>
              <MDBTabPane tabId="2" role="tabpanel">
                <RegisterUserForm />
              </MDBTabPane>
            </MDBTabContent>
          </MDBContainer>
        </BrowserRouter>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
