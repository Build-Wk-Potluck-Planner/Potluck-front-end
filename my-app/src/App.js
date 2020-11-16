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
import "./styles/App.css";

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
        </Switch>
      </div>
    </AppProvider>
  );
};

export default App;
