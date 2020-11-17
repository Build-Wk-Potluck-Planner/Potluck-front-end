import React from "react";
import { useHistory, Link } from "react-router-dom";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { H3, Button, Paragraph } from "../../styles";

const EventDetails = ({ event }) => {
  const history = useHistory();

  const removeEvent = (event) => {
    axiosWithAuth()
      .delete(`/api/events/${event.id}`)
      .then(() => {
        history.push("/reload");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="event-details">
      <img src={event.eventURL} alt="event-img" />
      <H3>{event.name}</H3>
      <Paragraph>{event.location}</Paragraph>
      <Paragraph>{event.description}</Paragraph>
      <Link to={`/edit-event/${event.id}`}>
        <Button>Edit</Button>
      </Link>
      <Button
        onClick={() => {
          removeEvent(event);
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default EventDetails;
