import React from "react";
import { connect } from 'react-redux';

class Calendar extends React.Component {
  render() {
    return (
      <div className="calendarWrapper">
        calendarWrapper
        <a href="https://mdbootstrap.com/plugins/react/full-calendar/">Calendar!</a>
      </div>
    );
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)