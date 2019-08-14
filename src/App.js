import React from "react";
import { connect } from 'react-redux';
import "./App.scss";
import Main from './components/Main';
import AuthForm from './components/AuthForm';

class App extends React.Component {
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)