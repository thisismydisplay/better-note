import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import  NotebooksPage  from '../NotebooksPage'

// import DashboardPage from "../DashboardPage";
// import NotesPage from "../NotesPage";
// import TagsPage from "../TagsPage";
// import NotebooksPage from "../NotebooksPage";
import BrowserNavigation from "../BrowserNavigation";
import "./BrowserRoutes.css";

// import * as sessionActions from "./store/session";
import HomeNavigation from "../HomeNavigation";

function NotesPage() {
    return <div>Notes</div>;
}
// function NotebooksPage() {
//     return <div>Notebooks</div>;
// }
function TagsPage() {
    return <div>Tags</div>;
}
function DashboardPage() {
    return (
        <div className="dashboard-container">
            <div>
                <img
                    className="dashboard-background"
                    // id="notes-btn"

                    alt="background"
                    src="
                        /images/dashboard-background.jpg"
                />
            </div>
            <div className="dashboard-header">
                <span className="welcome-span">Good morning/Evening</span>
                <span className="date-span">DATE</span>
            </div>
            <DashboardNotesContainer />
        </div>
    );
}

function DashboardNotes() {
    return <div>Note1</div>;
}
function DashboardNotesContainer() {
    return (
        <div className="dashboard-notes-container">
            <div className="notes-nav">
                <div className="notes-nav-top">
                    <NavLink className="notes-link" exact to="/browser/notes">
                        <div className="notes-nav-left">
                            <span>NOTES</span>
                            <img
                                className="green-arrow"
                                // id="notes-btn"

                                alt="notes"
                                src="
                        /images/green-arrow.svg"
                            />
                        </div>
                        <div className="notes-nav-right">
                            <img
                                className="create-note-icon"
                                // id="notes-btn"

                                alt="notes"
                                src="
                        /images/create-note.svg"
                            />
                        </div>
                    </NavLink>
                </div>
                <div className="notes-nav-bottom">
                    <span>Recent</span>
                    <span>Suggested</span>
                </div>
            </div>
            <DashboardNotes />
        </div>
    );
}

function BrowserRoutes() {
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
