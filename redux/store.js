// redux/store.js
import { createStore } from "redux";

// Initial state
const initialState = {
  examId: null,
  response: null,
  questions: null,
  examTime: null,
  examDate: null,
  examDuration: null,
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EXAM_ID":
      return { ...state, examId: action.payload };
    case "SET_EXAM_TIME":
      return { ...state, examTime: action.payload };
    case "SET_EXAM_DATE":
      return { ...state, examDate: action.payload };
      case "SET_EXAM_DURATION":
        return { ...state, examDuration: action.payload };
    case "SET_RESPONSE":
      return { ...state, response: action.payload };
    case "SET_QUESTION":
      return { ...state, questions: action.payload };
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer);

export default store;
