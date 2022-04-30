import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "../LoginFormPage";

import SignupFormPage from "../SignupFormPage";
import Error404Page from "../Error404Page";

import * as sessionActions from "../../store/session";
import HomeNavigation from "../HomeNavigation";

function Footer() {
    return (<div>
        <ul>
            <li>Github</li>
            <li>LinkedIn</li>
            <li>Etc</li>
        </ul>
    </div>)
}

function HomeRoutes() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
          <HomeNavigation isLoaded={isLoaded} />
          {isLoaded && (
              <div>

            <Switch>
              <Route path="/login">
                <LoginFormPage />
              </Route>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <Route path="/*">
                <Error404Page />
              </Route>
            </Switch>
            <Footer />
              </div>
          )}
        </>
      );
}

export default HomeRoutes
