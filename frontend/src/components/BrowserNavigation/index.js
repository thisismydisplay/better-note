import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProfileButton from "./ProfileButton";
import CreateNoteForm from "../CreateNoteForm";
import Modal from "../Modal";
import "./BrowserNavigation.css";

function BrowserNavigation({ sidebarOpen, isLoaded }) {
    const notes = useSelector((state) => state.note.list);
    const location = useLocation();
    const [showForm, setShowForm] = useState(false);

    return (
        <div
            className="sidebar"
            style={sidebarOpen ? { width: "208px" } : { width: "60px" }}
        >
            <ProfileButton sidebarOpen={sidebarOpen} />

            <div
                className="create-note-div"
                hidden={showForm}
                onClick={
                    notes.length
                        ? () => setShowForm(true)
                        : location.pathname === "/browser/notes/new"
                        ? null
                        : () => setShowForm(true)
                }
            >
                <img
                    className="create-note-icon"
                    alt="search"
                    src="
                    /images/plus-icon.svg"
                />
            </div>

            {showForm && (
                <Modal
                    onHide={() => {
                        setShowForm(false);
                    }}
                >
                    <CreateNoteForm hideForm={() => setShowForm(false)} />
                </Modal>
            )}
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
                        <span
                            style={
                                sidebarOpen
                                    ? { display: "flex" }
                                    : { display: "none" }
                            }
                        >
                            Home
                        </span>
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
                        <span
                            style={
                                sidebarOpen
                                    ? { display: "flex" }
                                    : { display: "none" }
                            }
                        >
                            Notes
                        </span>
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
                        <span
                            style={
                                sidebarOpen
                                    ? { display: "flex" }
                                    : { display: "none" }
                            }
                        >
                            Notebooks
                        </span>
                    </NavLink>
                </li>
                {/* <li className="sidebar-li">
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
                        <span
                            style={
                                sidebarOpen
                                    ? { display: "flex" }
                                    : { display: "none" }
                            }
                        >
                            Tags
                        </span>
                    </NavLink>
                </li> */}
            </ul>
        </div>
    );
}

export default BrowserNavigation;
