import React from "react";
import { connect } from "react-redux";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";

class AuthForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.LOGGED_IN(true);
    console.log('handleSubmit - todo: check if password match in db and login or error');
  };
  render() {
    return (
      <div>
        <MDBContainer className="loginWrapper">
          <MDBRow>
            <MDBCol md="6" className="loginCol">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardHeader className="form-header deep-blue-gradient rounded">
                    <h3 className="my-3">
                      <MDBIcon icon="lock" /> Login
                    </h3>
                  </MDBCardHeader>
                  <form onSubmit={this.handleSubmit}>
                    <div className="grey-text">
                      <MDBInput
                        label="Type your email"
                        icon="envelope"
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                        onChange={e => this.props.CHANGE_EMAIL(e)}
                      />
                      <MDBInput
                        label="Type your password"
                        icon="lock"
                        type="password"
                        validate
                        onChange={e => this.props.CHANGE_PASSWORD(e)}
                      />
                    </div>
                    <div className="text-center mt-4">
                      <MDBBtn color="light-blue" className="mb-3" type="submit">
                        Login
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authReducer.loggedIn
});

const mapDispatchToProps = dispatch => {
  return {
    LOGGED_IN: bool => {
      dispatch({ type: "LOGGED_IN", data: bool });
    },
    CHANGE_EMAIL: e => {
      dispatch({
        type: "CHANGE_EMAIL",
        data: e.target.value
      });
    },
    CHANGE_PASSWORD: e => {
      dispatch({
        type: "CHANGE_PASSWORD",
        data: e.target.value
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);
