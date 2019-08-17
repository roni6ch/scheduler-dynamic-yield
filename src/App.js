import React from "react";
import { connect } from 'react-redux';
import "./App.scss";
import Main from './components/Main';
import AuthForm from './components/AuthForm';

class App extends React.Component {


  componentDidMount() {
    //if already loggen in - stay connected
    let checkloggedIn = localStorage.getItem("user");
    if (checkloggedIn !== null) {
      //no need to go to server- client already connected
      this.props.LOGGED_IN(true);
      this.props.SET_USER_DETAILS(JSON.parse(checkloggedIn));
    } 
  }


  render() {
    const { loggedIn } = this.props;
    return (
      <div className="App">
        {!loggedIn ? <AuthForm /> : <Main />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authReducer.loggedIn
})

const mapDispatchToProps = dispatch => ({
    LOGGED_IN: bool => {
      dispatch({ type: "LOGGED_IN", data: bool });
    },
    
    SET_USER_DETAILS: data => {
      dispatch({ type: "SET_USER_DETAILS", data: data });
    },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)