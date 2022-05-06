import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NoteDetail from "../NoteDetail";
import { getNotes } from "../../store/note";
import "./DashboardNotesContainer.css";
import CreateNoteForm from "../CreateNoteForm";

import Modal from "../Modal";

function DashboardNotesContainer() {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;

    // const orderBy = useSelector((state) => state.session.orderBy);
    const notes = useSelector((state) => {
        return state.note.list;
    });
    console.log(notes);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        console.log("use effect");
        dispatch(getNotes(userId, "DESC"));
    }, [dispatch, userId]);

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
                                alt="notes"
                                src="
                        /images/green-arrow.svg"
                            />
                        </NavLink>
                    </div>
                    <div
                        className="notes-nav-right create-note-link"
                        hidden={showForm}
                        onClick={() => setShowForm(true)}
                    >
                        <img
                            className="create-note-icon"
                            alt="notes"
                            src="
                        /images/create-note.svg"
                        />
                    </div>
                    {showForm && (
                        <Modal
                            onHide={() => {
                                setShowForm(false);
                            }}
                        >
                            <CreateNoteForm
                                hideForm={() => setShowForm(false)}
                            />
                        </Modal>
                    )}
                </div>
                <div className="notes-nav-bottom">
                    <span>Recent</span>
                </div>
            </div>
            <div className="dashboard-notes-list">
                {notes?.map((note) => (
                    <NoteDetail note={note} />
                ))}
            </div>
        </div>
    );
}

export default DashboardNotesContainer;
