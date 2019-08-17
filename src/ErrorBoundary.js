import React from "react";
import "./error.scss";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <div className="context">
            <h1>Something went wrong.</h1>
          </div>

          <div className="area">
            <ul className="circles">
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
            </ul>
          </div>
        </React.Fragment>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
