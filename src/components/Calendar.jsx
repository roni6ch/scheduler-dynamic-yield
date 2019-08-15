import React from "react";
import { connect } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment'

import '@fullcalendar/core/main.css';
import '@fullcalendar/timegrid/main.css';
import { MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEventModal: false,
      events: [
        {
          title: 'Long Event',
          start: '2019-08-07',
          end: '2019-08-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2019-08-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2019-08-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2019-08-11',
          end: '2019-08-13'
        },
        {
          title: 'Meeting',
          start: '2019-08-12T10:30:00',
          end: '2019-08-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2019-08-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2019-08-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2019-08-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2019-08-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2019-08-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2019-08-28'
        }
      ]
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      newEventModal: !prevState.newEventModal
    }));
  }
  addNewEvent = () => {
    //todo: add new event to db (check if it has the same id and update in db)
    this.setState(prevState => ({
      events: [...prevState.events , {
        title: this.props.newEventName,
        start: this.props.newDate
      }]
    }));
    this.toggleModal();
  }
  handleDateClick = (arg) => {
    this.props.SET_NEW_SCHEDUALE(arg.dateStr);
    this.toggleModal();
  }
  deleteEvent= (e) => {
    //todo: delete from db
    let events = this.state.events;
    events = events.filter(event => event.title !== this.props.newEventName);
    this.setState({events});
    this.toggleModal();
  }
  eventClick = (e) => {
    e.el.style.borderColor = 'red';
    this.props.SET_NEW_EVENT_NAME(e.event.title)
    this.props.SET_NEW_SCHEDUALE(moment(e.event.start).format());
    this.toggleModal();
  }
  eventDrop = (info) => {
    //todo: update event date
    console.log(info.event.title + " was dropped on " + info.event.start.toISOString());
  }

  eventResize = (info) => {
    //todo: update event date
    console.log(info.event.title + " end is now " + info.event.end.toISOString());

  }
  render() {
    return (
      <div className="calendarWrapper">
        <a href="https://fullcalendar.io/docs#main">full Calendar!</a>

        <FullCalendar defaultView="timeGridWeek" plugins={[timeGridPlugin, interactionPlugin]} events={this.state.events}
          editable={true} overlap={true} droppable={true} dateClick={this.handleDateClick} eventClick={this.eventClick}
          eventDrop={this.eventDrop} eventResize={this.eventResize} />


        <MDBModal isOpen={this.state.newEventModal} toggle={this.toggleModal} centered>
          <MDBModalHeader toggle={this.toggleModal}>Add new Event</MDBModalHeader>
          <MDBModalBody>
            you chose {moment(this.props.newDate).format('LLL')}
            <MDBInput
                        label="Type your Event Name"
                        icon="calendar"
                        type="text"
                        value={this.props.newEventName}
                        validate
                        onChange={e => this.props.SET_NEW_EVENT_NAME(e.target.value)}
                      />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggleModal}>Cancel</MDBBtn>
            <MDBBtn color="warning" onClick={this.deleteEvent}>Delete</MDBBtn>
            <MDBBtn color="primary" onClick={this.addNewEvent}>Add new Event!</MDBBtn>
          </MDBModalFooter>
        </MDBModal>


      </div>
    );
  }
}

const mapStateToProps = state => ({
  newDate: state.calendarEventsReducer.date,
  newEventName: state.calendarEventsReducer.name
})

const mapDispatchToProps = dispatch => ({
  SET_NEW_SCHEDUALE: date => {
    dispatch({ type: "SET_NEW_SCHEDUALE", data: date });
  },
  SET_NEW_EVENT_NAME: name => {
    dispatch({ type: "SET_NEW_EVENT_NAME", data: name });
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)