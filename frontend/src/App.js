import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";

import SignupFormPage from "./components/SignupFormPage";
import Error404Page from "./components/Error404Page";
import HomeRoutes from "./components/HomeRoutes";
import * as sessionActions from "./store/session";
import HomeNavigation from "./components/HomeNavigation";
import BrowserRoutes from "./components/BrowserRoutes";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const sessionUser = useSelector(state => state.session.user);

  let routes;
  if (sessionUser) {
    routes = (
        <BrowserRoutes></BrowserRoutes>

    //   <ProfileButton user={sessionUser} />
    );
  } else {
    routes = (
      <>
       <HomeRoutes />
      </>
    );
  }
  return (
    <>
      {routes}
    </>
  );
}

export default App;
