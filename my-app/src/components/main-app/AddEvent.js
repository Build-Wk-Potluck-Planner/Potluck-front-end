import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { Input, Header, Button } from "../../styles/StyledComponents";

const initialFormValues = {
  name: "",
  location: "",
  time: "",
  date: "",
};

const AddEvent = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const history = useHistory();

  const handleChanges = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const addEvent = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/events", formValues)
      .then(() => {
        history.push("/reload");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="event-form">
        <Header>Add Event</Header>
        <form onSubmit={addEvent}>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formValues.name}
            onChange={handleChanges}
          />
          <Input
            type="text"
            name="location"
            placeholder="Location"
            value={formValues.location}
            onChange={handleChanges}
          />
          <Input
            type="text"
            name="time"
            placeholder="Time"
            value={formValues.time}
            onChange={handleChanges}
          />
          <Input
            type="text"
            name="date"
            placeholder="Date"
            value={formValues.date}
            onChange={handleChanges}
          />
          <Button>Add Event</Button>
        </form>
      </div>
    </>
  );
};

export default AddEvent;
