import React, { useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { H3, Button, Paragraph } from "../../styles";

const EventDetails = ({ event }) => {
  const history = useHistory();
  const params = useParams();

  const removeEvent = (event) => {
    axiosWithAuth()
      .delete(`/events/event/${event.eventid}`)
      .then(() => {
        history.push("/reload");
      })
      .catch((err) => console.log(err, event));
  };
  return (
    <div className="event-details">
      {/* <H3>{event.name}</H3> */}
      <Paragraph>{event.location}</Paragraph>
      <Paragraph>{event.date}</Paragraph>
      <Paragraph>{event.time}</Paragraph>
      <Link to={`/edit-event/${event.eventid}`}>
        <Button>Edit Event</Button>
      </Link>
      <Link to={`/add-attendee`}>
        <Button>Add Attendee</Button>
      </Link>
      <Button
        onClick={() => {
          removeEvent(event);
        }}
      >
        Delete
      </Button>
      {/* <Link to={`/my-attendees/${attendee.attendeeid}`}>
        <Button>View Attendees</Button>
      </Link> */}
    </div>
  );
};

export default EventDetails;
