import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { Input, Header, Button } from "../../styles";

const initialFormValues = {
  // name: "",
  location: "",
  time: "",
  date: "",
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
      .get(`/events/event/${params.id}`)
      .then((res) => {
        setFormValues(res.data);
      });
  }, [params.id]);

  const editEvent = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/events/event/${params.id}`, formValues)
      .then(() => {
        console.log(params);
        history.push("/reload");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="event-form">
      <Header>Edit Event</Header>
      <form onSubmit={editEvent}>
        {/* <Input
          type="text"
          name="name"
          placeholder="Name of Event"
          value={formValues.name}
          onChange={handleChanges}
        /> */}
        <Input
          type="text"
          name="location"
          placeholder="Location"
          value={formValues.location}
          onChange={handleChanges}
        />
        <Input
          type="text"
          name="date"
          placeholder="Date"
          value={formValues.date}
          onChange={handleChanges}
        />
        <Input
          type="text"
          name="time"
          placeholder="Time"
          value={formValues.time}
          onChange={handleChanges}
        />
        <Button>Edit Event</Button>
      </form>
    </div>
  );
};

export default EditEvent;
