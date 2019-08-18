import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import {
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBBtnGroup
} from "mdbreact";
import "@fullcalendar/core/main.css";
import "@fullcalendar/timegrid/main.css";

const serverUrl = "https://scheduler-dynamic-yield.herokuapp.com/";
class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEvent: false,
      newEventModal: false,
      modalError:false,
      filteredRoom: 'ALL',
      edittedEvent: {},
      events: [],
      eventsCopy: [],
      disableRooms: []
    };
  }

  //get events
  componentDidMount() {
    fetch(`${serverUrl}/getEvents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data && typeof data.error === "undefined") {
          this.setState({ events: data , eventsCopy: data });
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
  
  //add event
  submitEvent = () => {
    const { roomsBG, newEventName, checkedRoom, newDate, author } = this.props;
    const { newEvent } = this.state;
    this.setState({ modalError: false });

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
    if (newEventName === "" || checkedRoom === "")
     this.setState({ modalError: true });
    else if (newEvent) {
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
              ,eventsCopy:[...prevState.eventsCopy, data]
            }));

            this.props.INIT_EVENT();
            this.toggleModal();
          } else {
            //error
            console.log("error: ", data);
          }
        })
        .catch(error => console.error("error: ", error));
    } else {
      //edit event
      event.id = this.state.edittedEvent.extendedProps._id;
      event.end = this.state.edittedEvent.end;
      this.updateEvent(event);
      this.props.INIT_EVENT();
      this.toggleModal();
    }
  };
  //update event
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
          this.setState({ events , eventsCopy:events });
        } else {
          //error
          console.log("error: ", data);
        }
      })
      .catch(error => console.error("error: ", error));
  };
  
  //create new event (click on calendar)
  newEventClick = arg => {
    let disableRooms = this.checkOtherRoomsResevations(arg.dateStr);
    this.setState({ newEvent: true, disableRooms });
    this.props.INIT_EVENT();
    this.props.SET_EVENT_DATE(arg.dateStr);
    if (disableRooms.length !== this.props.rooms.length) this.toggleModal();
  };
  
  //check if theres any room left to event on that hour
  checkOtherRoomsResevations = date => {
    let disableRooms = [];
      this.state.eventsCopy.forEach((v, i) => {
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
      .catch(error => console.error("error: ", error));
  };
  //click on existing event
  eventClick = e => {
    e.el.style.borderColor = "red";
    this.setState({ newEvent: false, edittedEvent: e.event });
    this.props.SET_EVENT_NAME(e.event.title);
    this.props.SET_EVENT_DATE(moment(e.event.start).format());
    this.props.SET_CHECKED_ROOM(e.event.extendedProps.room);
    this.toggleModal();
  };

  eventDrop = info => {
    console.log(
      info.event.title + " was dropped on " + info.event.start.toISOString()
    );
  };

  eventResize = e => {
    //update event date
    let event = {
      id: e.event.extendedProps._id,
      title: e.event.title,
      room: e.event.extendedProps.room,
      backgroundColor: this.props.roomsBG[e.event.extendedProps.room],
      start: e.event.start,
      end: moment(e.event.end).format(),
      author: e.event.extendedProps.author
    };
    this.updateEvent(event);
  };

  handleRoomChange = e => {
    //change room on modal
    this.props.SET_CHECKED_ROOM(e.target.value);
  };

  filterRooms = room => {
    let events;
    if (room === "ALL")
      events = this.state.eventsCopy;
    else events = this.state.eventsCopy.filter((v,i)=>{
      return v.room === room
    })
    this.setState({ events , filteredRoom:room });
  }
  
    //change text on event
  eventRender = e => {
    //change text on event
    const event = e.event;
    const el = e.el;
    const content = (
      <React.Fragment>
        <div className="fc-content">
          <span>{event.title} - {event.extendedProps.author}</span>
        </div>
        <div className="fc-resizer fc-end-resizer" />
      </React.Fragment>
    );
    ReactDOM.render(content, el);
    return el;
  };
  render() {
    const { rooms, roomsBG, checkedRoom } = this.props;
    const { newEvent, disableRooms, modalError , filteredRoom} = this.state;

    return (
      <div className="calendarWrapper">

<MDBBtnGroup size="sm" className="mb-4 roomsButtons">
        <MDBBtn color="indigo" onClick={() => this.filterRooms('ALL')} className={ filteredRoom === 'ALL' && 'active' }>ALL Rooms</MDBBtn>
        <MDBBtn color="primary" onClick={() => this.filterRooms('A')}  className={ filteredRoom === 'A' && 'active' }>A Rooms</MDBBtn>
        <MDBBtn color="success" onClick={() => this.filterRooms('B')}  className={ filteredRoom === 'B' && 'active' }>B Rooms</MDBBtn>
        <MDBBtn color="warning" onClick={() => this.filterRooms('C')}  className={ filteredRoom === 'C' && 'active'}>C Rooms</MDBBtn>
      </MDBBtnGroup>

        <FullCalendar
          defaultView="timeGridWeek"
          plugins={[timeGridPlugin, interactionPlugin]}
          eventRender={this.eventRender}
          events={this.state.events}
          editable={false}
          allDaySlot={false}
          slotDuration={'01:00'}
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
            <MDBIcon far icon="clock" />{" "}
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
              if (disableRooms.indexOf(v) > -1) return "";
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
            <p className="message mb-0 mt-2">{modalError && 'Please Fill Event Name and Room number!'}</p>
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
