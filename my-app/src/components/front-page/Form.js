import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";

const defaultValues = {
  username: "",
  password: "",
};
const initialFormErrors = {
  username: "",
  password: "",
};

export default function Form() {
  // const { formValues } = props;

  //Values of the form
  const [formValues, setFormValues] = useState(defaultValues);
  //Storing the values from the form
  const [savedFormInfo, setSavedFormInfo] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [quotes, setQuotes] = useState([]);
  const history = useHistory();

  //The function to handle the onChange inside of the form
  const onChange = (evt) => {
    //Turns the evt.target(The place we are interacting with on the form )
    //Into something a bit more usable
    const { name, value } = evt.target;
    validate(name, value);
    //sets the current state of form based off from what is in the form
    setFormValues({ ...formValues, [name]: value });
  };
  //Function for submitting the data to state.

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

  const onSubmit = (evt) => {
    //Prevents the default behavious of submit which is reloading the page
    evt.preventDefault();
    //packaging an easy to use payload to put onto state
    const newData = {
      username: formValues.username.trim(),
      password: formValues.password.trimEnd(),
    };
    //adding the data to state
    postNewLogin(newData);
  };

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

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-container">
          <header>Login</header>
          {/* <label htmlFor="username"> */}
          Username
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={onChange}
          />
          <br />
          {/* </label>
          <label htmlFor="password"> */}
          Password
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={onChange}
          />
          <br />
          <div className="errors-container">
            <p>{formErrors.username}</p>
            <p>{formErrors.password}</p>
          </div>
          <br />
          {/* </label> */}
          <button disabled={disabled}>Submit</button>
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
