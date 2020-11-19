import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { Input, Header, Button } from "../../styles";

const initialFormValues = {
  // name: "",
  name: "",
  foodname: "",
};

const EditEvent = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const history = useHistory();
  const params = useParams();

  const handleChanges = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`/attendees/attendee/${params.attendees}`)
      .then((res) => {
        setFormValues(res.data[0]);
      });
  }, [params.attendees]);

  const editAttendee = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/attendees/attendee/${params.attendeesid}`, formValues)
      .then(() => {
        history.push("/reload");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="event-form">
      <Header>Edit Attendee</Header>
      <form onSubmit={editAttendee}>
        <Input
          type="text"
          name="name"
          placeholder="Name of Attendee"
          value={formValues.name}
          onChange={handleChanges}
        />
        <Input
          type="text"
          name="foodname"
          placeholder="Food Name"
          value={formValues.foodname}
          onChange={handleChanges}
        />
        <Button>Edit Attendee</Button>
      </form>
    </div>
  );
};

export default EditEvent;
