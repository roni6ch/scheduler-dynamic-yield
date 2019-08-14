import React from "react";
import { connect } from "react-redux";

class AuthForm extends React.Component {
  handleSubmitNewUser = e => {
    e.preventDefault();
    console.log('handleSubmitNewUser - todo: clean reducer and send to db');
  };
  render() {
    const { newUser } = this.props;
    return (
        <form className="text-center border border-light p-5" onSubmit={this.handleSubmitNewUser}>
        <p className="h4 mb-4">Sign up new User</p>
        <div className="form-row mb-4">
            <div className="col">
                <input type="text" className="form-control" placeholder="First name" value={newUser.name}   onChange={e => this.props.ADD_NEW_USER_NAME(e)} />
            </div>
            <div className="col">
                <input type="text" className="form-control" placeholder="Last name"  value={newUser.family}   onChange={e => this.props.ADD_NEW_USER_FAMILY(e)}/>
            </div>
        </div>
        <input type="email" className="form-control mb-4" placeholder="E-mail" value={newUser.email}   onChange={e => this.props.ADD_NEW_USER_EMAIL(e)}/>
        <input type="password"  className="form-control" placeholder="Password" value={newUser.password}   onChange={e => this.props.ADD_NEW_USER_PASSWORD(e)} />
        <button className="btn btn-info my-4 btn-block" type="submit">Sign in</button>
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);
