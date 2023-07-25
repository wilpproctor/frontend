import { createContext } from "react";

const StudentContext = createContext({
  backend: null,
  useStreamStore: null,
  sendAlert: null
});

export default StudentContext;
