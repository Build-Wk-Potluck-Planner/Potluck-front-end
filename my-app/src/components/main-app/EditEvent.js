import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { Input, Header, Button } from "../../styles";

const initialFormValues = {
  name: "",
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
      .get(`/api/events/${params.id}`)
      .then((res) => {
        setFormValues(res.data[0]);
      });
  }, [params.id]);

  const editEvent = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/events/${params.id}`, formValues)
      .then(() => {
        history.push("/reload");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="event-form">
      <Header>Edit Event</Header>
      <form onSubmit={editEvent}>
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
          name="date"
          placeholder="Date"
          value={formValues.location}
          onChange={handleChanges}
        />
        <Input
          type="text"
          name="time"
          placeholder="Time"
          value={formValues.date}
          onChange={handleChanges}
        />
        <Button>Edit Event</Button>
      </form>
    </div>
  );
};

export default EditEvent;
