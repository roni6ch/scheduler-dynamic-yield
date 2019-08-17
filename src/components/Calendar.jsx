import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";

import "@fullcalendar/core/main.css";
import "@fullcalendar/timegrid/main.css";
import {
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

const serverUrl = "http://localhost:8000";
class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEvent: false,
      newEventModal: false,
      edittedEvent:{},
      events: [],
      disableRooms: []
    };
  }

  componentDidMount() {
    //get events
    fetch(`${serverUrl}/getEvents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data && typeof data.error === "undefined") {
          console.log(data);
          this.setState({ events: data });
        } else {
          //error
          console.log("error: ", data);
        }
      })
      .catch(error => console.error("error2: ", error));
  }

  toggleModal = () => {
    this.setState(prevState => ({
      newEventModal: !prevState.newEventModal
    }));
  };
  submitEvent = () => {
    const { roomsBG, newEventName, checkedRoom, newDate, author } = this.props;
    const { newEvent } = this.state;

    let event = {
      title: newEventName,
      room: checkedRoom,
      backgroundColor: roomsBG[checkedRoom],
      start: newDate,
      end: moment(newDate).add(1, "hours"),
      author: author,
      action: newEvent
    };
    //add new event
    if (newEvent) {
      fetch(`${serverUrl}/addEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
      })
        .then(response => response.json())
        .then(data => {
          if (!data.error) {
            this.setState(prevState => ({
              events: [...prevState.events, data]
            }));

            this.props.INIT_EVENT();
            this.toggleModal();
          } else {
            //error
            console.log("error: ", data);
          }
        })
        .catch(error => console.error("error2: ", error));
    } else {
      //edit event
      event.id = this.state.edittedEvent.extendedProps._id;
      event.end = this.state.edittedEvent.end;
      this.updateEvent(event);
      this.props.INIT_EVENT();
      this.toggleModal();
    }
  };
  updateEvent = event => {
    fetch(`${serverUrl}/editEvent`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          let events = this.state.events.map((v, i) => {
            if (v._id === data._id) {
              return data;
            }
            return v;
          });
          this.setState({ events });
        } else {
          //error
          console.log("error: ", data);
        }
      })
      .catch(error => console.error("error2: ", error));
  }
  newEventClick = arg => {
    let disableRooms = this.checkOtherRoomsResevations(arg.dateStr);
    this.setState({ newEvent: true, disableRooms });
    this.props.INIT_EVENT();
    this.props.SET_EVENT_DATE(arg.dateStr);
    if (disableRooms.length !== this.props.rooms.length) this.toggleModal();
  };
  checkOtherRoomsResevations = date => {
    let disableRooms = [];
    if (this.state.events.length > 0)
      this.state.events.forEach((v, i) => {
        if (moment(date).isBetween(v.start, v.end, null, "[)"))
          disableRooms.push(v.room);
      });
    return disableRooms;
  };
  deleteEvent = e => {
    let event = {
      id: this.state.edittedEvent.extendedProps._id
    };
    fetch(`${serverUrl}/deleteEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          let events = this.state.events;
          events = events.filter(e => e._id !== event.id);
          this.setState({ events });
          this.toggleModal();
        } else {
          //error
          console.log("error: ", data);
        }
      })
      .catch(error => console.error("error2: ", error));
  };
  eventClick = e => {
    e.el.style.borderColor = "red";
    this.setState({ newEvent: false, edittedEvent:e.event });
    this.props.SET_EVENT_NAME(e.event.title);
    this.props.SET_EVENT_DATE(moment(e.event.start).format());
    this.props.SET_CHECKED_ROOM(e.event.extendedProps.room);
    this.toggleModal();
  };
  eventDrop = info => {
    //todo: update event date
    console.log(
      info.event.title + " was dropped on " + info.event.start.toISOString()
    );
  };

  eventResize = e => {
    //todo: update event date
    let event = {
      id : e.event.extendedProps._id,
      title: e.event.title,
      room:  e.event.extendedProps.room,
      backgroundColor: this.props.roomsBG[e.event.extendedProps.room],
      start:  e.event.start,
      end: moment(e.event.end).format(),
      author: e.event.extendedProps.author
    };
    this.updateEvent(event);
  };
  handleRoomChange = e => {
    this.props.SET_CHECKED_ROOM(e.target.value);
  };
  eventRender = e => {
    const event = e.event;
    const el = e.el;
    const content = (
      <React.Fragment>
        <div className="fc-content">
          <span>{event.title}</span>
          <span>{event.extendedProps.author}</span>
        </div>
        <div className="fc-resizer fc-end-resizer" />
      </React.Fragment>
    );
    ReactDOM.render(content, el);
    return el;
  };
  render() {
    const { rooms, roomsBG, checkedRoom } = this.props;
    const { newEvent, disableRooms } = this.state;

    return (
      <div className="calendarWrapper">
        <FullCalendar
          defaultView="timeGridWeek"
          plugins={[timeGridPlugin, interactionPlugin]}
          eventRender={this.eventRender}
          events={this.state.events}
          editable={false}
          selectable={true}
          overlap={true}
          dateClick={this.newEventClick}
          eventClick={this.eventClick}
          eventResize={this.eventResize}
        />

        <MDBModal
          isOpen={this.state.newEventModal}
          toggle={this.toggleModal}
          centered
        >
          <MDBModalHeader toggle={this.toggleModal}>
            {newEvent ? "ADD" : "EDIT"} Event!
          </MDBModalHeader>
          <MDBModalBody>
            <MDBIcon far icon="calendar" />{" "}
            <span className="date">
              {moment(this.props.newDate).format("LLL")}
            </span>
            <MDBInput
              label={`${newEvent ? "Type" : "Edit"} your Event Name`}
              icon="calendar"
              type="text"
              value={this.props.newEventName}
              validate
              onChange={e => this.props.SET_EVENT_NAME(e.target.value)}
            />
            {rooms.map((v, i) => {
              if (disableRooms.indexOf(v) > -1) return;
              return (
                <div className="custom-control custom-radio" key={v}>
                  <input
                    type="radio"
                    className="custom-control-input"
                    name="rooms"
                    id={`room${v}`}
                    value={v}
                    checked={checkedRoom === v}
                    onChange={this.handleRoomChange}
                  />
                  <label
                    className={`custom-control-label roomNames`}
                    style={{ color: roomsBG[v] }}
                    htmlFor={`room${v}`}
                  >
                    Room {v}
                  </label>
                </div>
              );
            })}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggleModal}>
              Cancel
            </MDBBtn>
            {!newEvent && (
              <MDBBtn color="warning" onClick={this.deleteEvent}>
                Delete
              </MDBBtn>
            )}
            <MDBBtn color="primary" onClick={this.submitEvent}>
              {newEvent ? "ADD" : "EDIT"} Event!
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.calendarEventsReducer.rooms,
  roomsBG: state.calendarEventsReducer.roomsBG,
  checkedRoom: state.calendarEventsReducer.checkedRoom,
  newDate: state.calendarEventsReducer.date,
  newEventName: state.calendarEventsReducer.name,
  author: state.authReducer.name
});

const mapDispatchToProps = dispatch => ({
  SET_EVENT_DATE: date => {
    dispatch({ type: "SET_EVENT_DATE", data: date });
  },
  SET_EVENT_NAME: name => {
    dispatch({ type: "SET_EVENT_NAME", data: name });
  },
  SET_CHECKED_ROOM: room => {
    dispatch({ type: "SET_CHECKED_ROOM", data: room });
  },
  INIT_EVENT: () => {
    dispatch({ type: "INIT_EVENT" });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
