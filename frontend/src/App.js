import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import HomeRoutes from "./components/HomeRoutes";
import * as sessionActions from "./store/session";
import BrowserRoutes from "./components/BrowserRoutes";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);
    const sessionUser = useSelector((state) => state.session.user);

    let routes;
    if (sessionUser) {
        routes = <BrowserRoutes></BrowserRoutes>;
    } else {
        routes = (
            <>
                <HomeRoutes />
            </>
        );
    }
    return <>{routes}</>;
}

export default App;
