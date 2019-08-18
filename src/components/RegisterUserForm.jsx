import React from "react";
import { connect } from "react-redux";
import properties from './properties';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUser: ""
    };
  }
  handleSubmitNewUser = e => {
    e.preventDefault();
    this.setState({ signUser: false });
    const { name, family, email, password } = this.props.newUser;
    let data = {
      name,
      family,
      email,
      password
    };
    fetch(`${properties.serverUrl}/signUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          this.setState({ signUser: "User created successfully!" });
        } else {
          //error
          this.setState({ signUser: data.error });
          console.log("error: ", data);
        }
      })
      .catch(error => console.error("error2: ", error));
  };
  render() {
    const { newUser } = this.props;
    const { signUser } = this.state;

    return (
      <form
        className="text-center border-light p-5"
        onSubmit={this.handleSubmitNewUser}
      >
        <p className="h4 mb-4">Sign up new User</p>
        <div className="form-row mb-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              value={newUser.name}
              onChange={e => this.props.ADD_NEW_USER_NAME(e)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              value={newUser.family}
              onChange={e => this.props.ADD_NEW_USER_FAMILY(e)}
            />
          </div>
        </div>
        <input
          type="email"
          className="form-control mb-4"
          placeholder="E-mail"
          value={newUser.email}
          onChange={e => this.props.ADD_NEW_USER_EMAIL(e)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={newUser.password}
          onChange={e => this.props.ADD_NEW_USER_PASSWORD(e)}
        />
        <button className="btn btn-info my-4 btn-block" type="submit">
          Sign new User
        </button>
        <p className="message">{signUser}</p>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  newUser: state.newUserReducer
});

const mapDispatchToProps = dispatch => {
  return {
    ADD_NEW_USER_NAME: e => {
      dispatch({
        type: "ADD_NEW_USER_NAME",
        data: e.target.value
      });
    },
    ADD_NEW_USER_FAMILY: e => {
      dispatch({
        type: "ADD_NEW_USER_FAMILY",
        data: e.target.value
      });
    },
    ADD_NEW_USER_EMAIL: e => {
      dispatch({
        type: "ADD_NEW_USER_EMAIL",
        data: e.target.value
      });
    },
    ADD_NEW_USER_PASSWORD: e => {
      dispatch({
        type: "ADD_NEW_USER_PASSWORD",
        data: e.target.value
      });
    },
    INIT_NEW_USER: () => {
      dispatch({
        type: "INIT_NEW_USER"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);
