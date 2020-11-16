import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContext";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { Header, Button } from "../../styles/StyledComponents";
import EventDetails from "./EventDetails";

const MyEvents = () => {
  const [eventList, setEventList] = useContext(AppContext);

  const fetchEvents = () => {
    axiosWithAuth()
      .get(`/api/events`)
      .then((res) => setEventList(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchEvents();
  });

  return (
    <>
      <div className="event-card">
        <Header>My Events</Header>
        <Link to={"/add-event"}>
          <Button>New Event</Button>
        </Link>
        {eventList.map((event) => {
          return <EventDetails key={event.id} event={event} />;
        })}
      </div>
    </>
  );
};

export default MyEvents;
