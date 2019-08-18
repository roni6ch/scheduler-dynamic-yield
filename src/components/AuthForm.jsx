import React from "react";
import { connect } from "react-redux";
import properties from './properties';
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

  constructor(props) {
    super(props);
    this.state = {
    error:false,
    }
  }
  componentDidMount() {
    //if already loggen in - stay connected
    let checkloggedIn = localStorage.getItem("loggedIn");
    if (checkloggedIn !== null && checkloggedIn === "true") {
      //no need to go to server- client already connected
      this.props.LOGGED_IN(true);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.props;
    let data = {
      email,
      password
    };
    this.setState({error:false});
    fetch(`${properties.serverUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          localStorage.setItem("user", JSON.stringify(data));
          this.props.LOGGED_IN(true);
          this.props.SET_USER_DETAILS(data);
          console.log(data);
        }
        else{
          //error
          this.setState({error:data})
        }
      })
      .catch(error => console.error(error))
  };
  render() {
    const {error} = this.state;
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
                        onClick={e => this.setState({error:false})}
                      />
                      <MDBInput
                        label="Type your password"
                        icon="lock"
                        type="password"
                        validate
                        onChange={e => this.props.CHANGE_PASSWORD(e)}
                        onClick={e => this.setState({error:false})}
                      />
                    </div>
                    {error && <p className="authError">{error.error}</p>}
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
  loggedIn: state.authReducer.loggedIn,
  email: state.authReducer.email,
  password: state.authReducer.password
});

const mapDispatchToProps = dispatch => {
  return {
    LOGGED_IN: bool => {
      dispatch({ type: "LOGGED_IN", data: bool });
    },
    SET_USER_DETAILS: data => {
      dispatch({ type: "SET_USER_DETAILS", data: data });
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
