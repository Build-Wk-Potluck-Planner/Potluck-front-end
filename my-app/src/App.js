import React from "react";
import "./styles/App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { AppProvider } from "./components/main-app/AppContext";
import NavBar from "./components/main-app/Navbar";
import LoginForm from "./components/front-page/LoginForm";
import SignupForm from "./components/front-page/SignupForm";
import MyEvents from "./components/main-app/MyEvents";
import AddEvent from "./components/main-app/AddEvent";
import EditEvent from "./components/main-app/EditEvent";
import PrivateRoute from "./components/main-app/PrivateRoute";
import AddAttendee from "./components/main-app/AddAttendee";
import EditAttendee from "./components/main-app/EditAttendee";
import "./styles/App.css";
import MyAttendees from "./components/main-app/MyAttendees";

const App = () => {
  return (
    <AppProvider>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
          <Redirect exact from="/reload" to="/" />
          <PrivateRoute exact path="/" component={MyEvents} />
          <PrivateRoute exact path="/add-event" component={AddEvent} />
          <PrivateRoute exact path="/edit-event/:id" component={EditEvent} />
          <PrivateRoute exact path="/add-attendee/" component={AddAttendee} />
          <PrivateRoute exact path="/edit-attendee/" component={EditAttendee} />
          <PrivateRoute exact path="/my-attendees/" component={MyAttendees} />
        </Switch>
      </div>
    </AppProvider>
  );
};

export default App;


// import React, { useState } from "react";
// import Form from "./Form";

// const defaultValues = {
//   name: "",
//   email: "",
// };

// function App() {
//   //Values of the form
//   const [formValues, setFormValues] = useState(defaultValues);
//   //Storing the values from the form
//   const [savedFormInfo, setSavedFormInfo] = useState([]);
//   //The function to handle the onChange inside of the form
//   const change = (evt) => {
//     //Turns the evt.target(The place we are interacting with on the form )
//     //Into something a bit more usable
//     const { name, value } = evt.target;
//     //sets the current state of form based off from what is in the form
//     setFormValues({ ...formValues, [name]: value });
//   };
//   //Function for submitting the data to state.
//   const submit = (evt) => {
//     //Prevents the default behavious of submit which is reloading the page
//     evt.preventDefault();
//     //packaging an easy to use payload to put onto state
//     const newData = {
//       name: formValues.name.trim(),
//       email: formValues.email.trimEnd(),
//     };
//     //adding the data to state
//     setSavedFormInfo([...savedFormInfo, newData]);
//     setFormValues(defaultValues);
//   };
//   return (
//     <div className="App">
//       <Form formValues={formValues} change={change} submit={submit}/>
//     </div>
//   );
// }

// export default App;