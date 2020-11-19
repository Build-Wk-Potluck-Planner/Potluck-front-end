import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { Input, Header, Button } from "../../styles";

const initialFormValues = {
  attendee: "",
  foodname: "",
};

const AddAttendee = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const history = useHistory();

  const handleChanges = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const addAttendee = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/attendees/attendee", formValues)
      .then(() => {
        history.push("/reload");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="event-form">
        <Header>Add Attendee</Header>
        <form onSubmit={addAttendee}>
          <Input
            type="text"
            name="attendee"
            placeholder="Attendee's Name"
            value={formValues.attendee}
            onChange={handleChanges}
          />
          <Input
            type="text"
            name="foodname"
            placeholder="Food Item"
            value={formValues.foodname}
            onChange={handleChanges}
          />
          <Button>Add Attendee</Button>
        </form>
      </div>
    </>
  );
};

export default AddAttendee;
