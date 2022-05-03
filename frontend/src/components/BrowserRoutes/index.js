import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import  NotebooksPage  from '../NotebooksPage'
import  DashboardPage  from '../DashboardPage'
import DashboardNotesContainer from "../DashboardNotesContainer";
import { setFirstNotebook } from "../../store/notebook";
import { getNotes } from "../../store/note";
// import DashboardPage from "../DashboardPage";
// import NotesPage from "../NotesPage";
// import TagsPage from "../TagsPage";
// import NotebooksPage from "../NotebooksPage";
import BrowserNavigation from "../BrowserNavigation";
import "./BrowserRoutes.css";
import NotesPage from "../NotesPage"
// import * as sessionActions from "./store/session";
import HomeNavigation from "../HomeNavigation";

// function NotesPage() {
//     return <div>Notes</div>;
// }
// // function NotebooksPage() {
// //     return <div>Notebooks</div>;
// // }
function TagsPage() {
    return <div>Tags</div>;
}
// function DashboardPage() {
//     return (
//         <div className="dashboard-container">
//             <div>
//                 <img
//                     className="dashboard-background"
//                     // id="notes-btn"

//                     alt="background"
//                     src="
//                         /images/dashboard-background.jpg"
//                 />
//             </div>
//             <div className="dashboard-header">
//                 <span className="welcome-span">Good morning/Evening</span>
//                 <span className="date-span">DATE</span>
//             </div>
//             <DashboardNotesContainer />
//         </div>
//     );
// }




function BrowserRoutes() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    useEffect(() => {
        console.log('use effect')
        dispatch(setFirstNotebook(userId));
    }, [dispatch]);
    useEffect(() => {
        console.log('use effect')
        dispatch(getNotes(userId));
    }, [dispatch]);

    const [showBrowserNav, setShowBrowserNav] = useState(false);
    return (
        //conditionally render dashboard, notebooks, notes, or tags
        <div>
            <div>
                <BrowserNavigation sidebarOpen={showBrowserNav} />
            </div>
            <div
                style={
                    showBrowserNav
                        ? { marginLeft: "208px" }
                        : { marginLeft: "60px" }
                }
            >
                <Switch>
                    <Route path="/browser/dashboard">
                        <DashboardPage />
                    </Route>
                    <Route path="/browser/notes">
                        <NotesPage />
                    </Route>
                    <Route path="/browser/notebooks">
                        <NotebooksPage />
                    </Route>
                    <Route path="/browser/tags">
                        <TagsPage />
                    </Route>
                    <Route path="/">
                        <Redirect to="/browser/dashboard" />
                    </Route>
                </Switch>
            </div>
            <div
                className="showSidebar-div"
                style={
                    showBrowserNav
                        ? {
                              marginLeft: "188px",
                          }
                        : {
                              marginLeft: "40px",
                          }
                }
                onClick={() => setShowBrowserNav(!showBrowserNav)}
            >
                <img
                    className="showSidebar-img"
                    alt="closeSidebar"
                    src={
                        showBrowserNav
                            ? "/images/left-arrow.svg"
                            : "/images/right-arrow.svg"
                    }
                />
            </div>
        </div>
    );
}

export default BrowserRoutes;
