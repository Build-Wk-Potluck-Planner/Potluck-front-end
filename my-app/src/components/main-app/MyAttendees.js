import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContext";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { Header, Button } from "../../styles/";
import AttendeeDetails from "./AttendeeDetails";

const MyAttendees = () => {
  const [AttendeesList, setAttendeesList] = useContext(AppContext);

  const fetchAttendees = () => {
    axiosWithAuth()
      .get("/attendees/attendees")
      .then((res) => setAttendeesList(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAttendees();
  }, []);

  return (
    <>
      <div className="event-card">
        <Header>My Attendees</Header>
        <Link to={"/add-attendee"}>
          <Button>New Attendee</Button>
        </Link>
        {attendeeList.map((attendee) => {
          return <AttendeeDetails key={attendee.id} event={attendee} />;
        })}
      </div>
    </>
  );
};

export default MyAttendees;
