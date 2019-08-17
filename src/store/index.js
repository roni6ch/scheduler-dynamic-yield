import { combineReducers, createStore } from "redux";

const authState = {
  loggedIn: false,
  name: "",
  family: "",
  email: "",
  password: ""
};
const authReducer = (state = authState, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      localStorage.setItem("loggedIn", action.data);
      if (!action.data) {
        localStorage.removeItem("user");
        return {
          ...state,
          loggedIn: action.data,
          name: "",
          family: "",
          email: "",
          password: ""
        };
      }
      return { ...state, loggedIn: action.data };
    case "SET_USER_DETAILS":
      return {
        ...state,
        name: action.data.name,
        family: action.data.family,
        email: action.data.email
      };
    case "CHANGE_EMAIL":
      return { ...state, email: action.data };
    case "CHANGE_PASSWORD":
      return { ...state, password: action.data };
    default:
      return state;
  }
};

const newUserState = {
  name: "",
  family: "",
  email: "",
  password: ""
};
const newUserReducer = (state = newUserState, action) => {
  switch (action.type) {
    case "INIT_NEW_USER":
      return { newUserState };
    case "ADD_NEW_USER_NAME":
      return { ...state, name: action.data };
    case "ADD_NEW_USER_FAMILY":
      return { ...state, family: action.data };
    case "ADD_NEW_USER_EMAIL":
      return { ...state, email: action.data };
    case "ADD_NEW_USER_PASSWORD":
      return { ...state, password: action.data };
    default:
      return state;
  }
};

const calendarEventsState = {
  date: "",
  name: "",
  rooms: ["A", "B", "C"],
  roomsBG: { A: "#33b5e5", B: "#35ea14", C: "#ffab13" },
  checkedRoom: ""
};
const calendarEventsReducer = (state = calendarEventsState, action) => {
  switch (action.type) {
    case "SET_EVENT_DATE":
      return { ...state, date: action.data };
    case "SET_EVENT_NAME":
      return { ...state, name: action.data };
    case "SET_CHECKED_ROOM":
      return { ...state, checkedRoom: action.data };
    case "INIT_EVENT":
      return { ...state, date: "", name: "", checkedRoom: "" };
    default:
      return state;
  }
};

const reducers = combineReducers({
  authReducer,
  newUserReducer,
  calendarEventsReducer
});
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
