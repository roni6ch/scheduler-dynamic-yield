import { combineReducers, createStore } from "redux";

const initialState = {
  loggedIn: false,
  email: "",
  password: ""
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return { ...state, loggedIn: action.data };
    case "CHANGE_EMAIL":
      return { ...state, email: action.data };
    case "CHANGE_PASSWORD":
      return { ...state, password: action.data };
    default:
      return state;
  }
};

const newUserState = {
    name:"",
    family:"",
    email: "",
    password: ""
};
const newUserReducer = (state = newUserState, action) => {
  switch (action.type) {
    case "ADD_NEW_USER_NAME":
            return { ...state, name: action.data };
            case "ADD_NEW_USER_FAMILY":
                    return { ...state, family: action.data };
    case "ADD_NEW_USER_EMAIL":
      return { ...state, email: action.data };
      case "ADD_NEW_USER_PASSWORD":
        return { ...state, password: action.data };
        case "SIGN_USER":
            console.log("add user to db");
          return { ...state};
    default:
      return state;
  }
};


const calendarEventsState = {
  date:"",
  name:""
};
const calendarEventsReducer = (state = calendarEventsState, action) => {
switch (action.type) {
  case "SET_NEW_SCHEDUALE":
          return { ...state, date: action.data };
          case "SET_NEW_EVENT_NAME":
            return { ...state, name: action.data };
    
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
