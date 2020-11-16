import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [eventList, setEventList] = useState([]);
  const [userId, setUserId] = useState([]);

  return (
    <AppContext.Provider value={[eventList, setEventList, userId, setUserId]}>
      {props.children}
    </AppContext.Provider>
  );
};
