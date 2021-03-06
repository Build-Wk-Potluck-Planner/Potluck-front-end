import React, { useState, useEffect } from "react";
import "../../styles/App.css";
import axios from "axios";
import * as yup from "yup";
import { Row, MainPageContainer } from "../../styles";

const formSchema = yup.object().shape({
  fullname: yup.string().required("Name is a required field."),
  username: yup.string().required("Username is required field"),
  password: yup
    .string()
    .required("Password must be at least 6 Characters long"),
});

export default function Form() {
  const [register, setRegister] = useState({
    fullname: "",
    username: "",
    // email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    username: "",
    // email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [post, setPost] = useState([]);

  const inputChange = (e) => {
    e.persist();
    const newFormData = {
      ...register,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };

    validateChange(e);
    setRegister(newFormData);
  };

  useEffect(() => {
    formSchema.isValid(register).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [register]);

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };
  //on submit
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(register);
    axios
      .post(
        "https://buildweekpotluckplanner.herokuapp.com/createnewuser",
        register
      )
      .then((res) => {
        setRegister({
          fullname: "",
          username: "",
          // email: "",
          password: "",
        });
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <MainPageContainer>
      <form className="registerForm" onSubmit={formSubmit}>
        <Row>
          <h1 id="register">Register</h1>
          <br />
          <label htmlFor="fullname">
            <h4>Fullname:</h4>
            <input
              type="text"
              name="fullname"
              id="fullnameinput"
              placeholder="Name"
              value={register.name}
              onChange={inputChange}
            />
            {errors.fullname.length > 0 ? (
              <p className="error">{errors.fullname}</p>
            ) : null}
          </label>
          <label htmlFor="username">
            <h4>Username:</h4>
            <input
              type="text"
              name="username"
              id="usernameinput"
              placeholder="Username"
              value={register.username}
              onChange={inputChange}
            />
            {errors.username.length > 0 ? (
              <p className="error">{errors.username}</p>
            ) : null}
          </label>
          {/* 
            <label htmlFor = 'email'>
            <h4>Email:</h4>
            <input
            type = 'email'
            name = 'email'
            id = 'emailinput'
            placeholder = 'Email'
            value={register.email}
            onChange={inputChange}
            />
            {errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}
        </label> */}

          <label htmlFor="password">
            <h4>Password:</h4>
            <input
              type="password"
              name="password"
              id="passwordinput"
              placeholder="Password"
              value={register.password}
              onChange={inputChange}
            />
            {errors.password.length > 6 ? (
              <p className="error">{errors.password}</p>
            ) : null}
          </label>
          <button name="submit" disabled={buttonDisabled}>
            Submit
          </button>
          <pre>{JSON.stringify(post, null, 2)}</pre>
        </Row>
      </form>
    </MainPageContainer>
  );
}
