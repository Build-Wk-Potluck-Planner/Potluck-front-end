import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//import axiosWithAuth from "../../utils/axiosWithAuth";
import axios from "axios";
import * as yup from "yup";
// import {
//   Paragraph,
//   Header,
//   Button,
//   Input,
//   Quote,
// } from "../../styles;

const initialFormValues = {
  username: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  password: "",
};

export default function LoginForm() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const history = useHistory();

  // Login

  const postNewLogin = (newLogin) => {
    axios
      .post(
        "https://buildweekpotluckplanner.herokuapp.com/login",
        `grant_type=password&username=${newLogin.username}&password=${newLogin.password}`,
        {
          headers: {
            // btoa is converting our client id/client secret into base64
            Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        window.localStorage.setItem("token", res.data.access_token);
        history.push("/");
      })
      .catch((err) => {
        //debugger;
        console.log(err);
      });
  };

  const change = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    inputChange(name, valueToUse);
  };

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const submit = (evt) => {
    evt.preventDefault();
    const newLogin = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
    };
    postNewLogin(newLogin);
  };

  // Fetch Quote

  const fetchQuote = () => {
    axios
      .get("https://quotes.rest/qod?language=en")
      .then((res) => {
        setQuotes(res.data.contents.quotes);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  // Form Validation

  const formSchema = yup.object().shape({
    username: yup.string().required("Must include username."),
    password: yup
      .string()
      .required("Password is Required")
      .min(4, "Passwords must be at least 4 characters long."),
  });

  const validate = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  });

  return (
    <div>
      <form onSubmit={submit}>
        <div className="form-container">
          <header>Login</header>

          <input
            type="text"
            name="username"
            placeholder="Enter Your Username"
            value={formValues.username}
            onChange={change}
          />
          <br />

          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={formValues.password}
            onChange={change}
          />
          <br />

          <div className="errors-container">
            <p>{formErrors.username}</p>
            <p>{formErrors.password}</p>
          </div>
          <br />

          <button disabled={disabled}>Click to Log In</button>

          {quotes.map((quote) => {
            return (
              <div>
                <div key={quote.id}>
                  <p>"{quote.quote}"</p>
                  <p>{quote.author}</p>
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}
