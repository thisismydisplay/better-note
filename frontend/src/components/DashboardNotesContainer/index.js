import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import DashboardNote from "../DashboardNote";
import { getNotes } from "../../store/note";
// import note from "../../../../backend/db/models/note";

function DashboardNotesContainer() {
    const dispatch = useDispatch();
    // const { notebookId } = useParams();
    // console.log( notebookId)
    // console.log(state)
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const notes = useSelector((state) => {
        return state.note.list;
    });
    console.log(notes);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        console.log("use effect");
        dispatch(getNotes(userId));
    }, [dispatch]);

    console.log("notes", notes);
    if (!notes) {
        return null;
    }
    return (
        <div className="dashboard-notes-container">
            <div className="notes-nav">
                <div className="notes-nav-top">
                    <div className="notes-nav-left">
                        <NavLink
                            className="notes-link"
                            exact
                            to={`/browser/notes/`}
                        >
                            <span>NOTES</span>
                            <img
                                className="green-arrow"
                                // id="notes-btn"

                                alt="notes"
                                src="
                        /images/green-arrow.svg"
                            />
                        </NavLink>
                    </div>
                    <div className="notes-nav-right">
                        <NavLink
                            className="create-note-link"
                            exact
                            to={`/browser/notes/`}
                        >
                            <img
                                className="create-note-icon"
                                // id="notes-btn"

                                alt="notes"
                                src="
                        /images/create-note.svg"
                                // onClick={()=>{}}
                            />
                        </NavLink>
                    </div>
                </div>
                <div className="notes-nav-bottom">
                    <span>Recent</span>
                    <span>Suggested</span>
                </div>
            </div>
            <div className="dashboard-notes-list">
                {notes?.map((note) => (
                        <NavLink
                            key={note.id}
                            exact
                            to={`/browser/notes/${note.id}`}
                        >
                            <span>test</span>
                            <DashboardNote note={note} />;
                        </NavLink>
                ))}
            </div>
        </div>
    );
}

export default DashboardNotesContainer;
