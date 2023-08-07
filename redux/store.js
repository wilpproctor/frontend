// redux/store.js
import { createStore } from "redux";

// Initial state
const initialState = {
  examId: null,
  response: null,
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EXAM_ID":
      return { ...state, examId: action.payload };
    case "SET_RESPONSE":
      return { ...state, response: action.payload };
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer);

export default store;
