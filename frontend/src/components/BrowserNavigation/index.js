import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./BrowserNavigation.css";

function CreateNoteButton() {
    return <div>+New</div>;
}

function BrowserNavigation({ sidebarOpen, isLoaded }) {
    //   const sessionUser = useSelector(state => state.session.user);

    //   let sessionLinks;
    //   if (sessionUser) {
    //     sessionLinks = (
    //       <ProfileButton user={sessionUser} />
    //     );
    //   } else {
    //     Redirect
    //   }

    return (
        <div className="sidebar" style={sidebarOpen ? { width: '208px'} : {width: '60px'}}>
            <ProfileButton sidebarOpen={sidebarOpen}/>
            <CreateNoteButton />
            <ul className="sidebar-ul">
                <li className="sidebar-li">
                    <NavLink
                        className="sidebar-navlink"
                        exact
                        to="/browser/dashboard"
                    >
                        <img
                            className="sidebar-link-img"
                            id="home-btn"
                            alt="home"
                            src="/images/home-deselected.svg"
                        />
                        <span style={sidebarOpen ? { display: 'flex'} : {display: 'none'}}>Home</span>
                    </NavLink>
                </li>
                <li className="sidebar-li">
                    <NavLink
                        className="sidebar-navlink"
                        exact
                        to="/browser/notes"
                    >
                        <img
                            className="sidebar-link-img"
                            id="notes-btn"

                            alt="notes"
                            src="/images/notes-deselected.svg"
                        />
                        <span style={sidebarOpen ? { display: 'flex'} : {display: 'none'}}>Notes</span>
                    </NavLink>
                </li>
                <li className="sidebar-li">
                    <NavLink
                        className="sidebar-navlink"
                        exact
                        to="/browser/notebooks"
                    >
                        <img
                            className="sidebar-link-img"
                            id="notebooks-btn"

                            alt="notebooks"
                            src="/images/notebooks.svg"
                        />
                        <span style={sidebarOpen ? { display: 'flex'} : {display: 'none'}}>Notebooks</span>
                    </NavLink>
                </li>
                <li className="sidebar-li">
                    <NavLink
                        className="sidebar-navlink"
                        exact
                        to="/browser/tags"
                    >
                        <img
                            className="sidebar-link-img"
                            id="tags-btn"

                            alt="tags"
                            src="/images/tags.svg"
                        />
                        <span style={sidebarOpen ? { display: 'flex'} : {display: 'none'}}>Tags</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default BrowserNavigation;