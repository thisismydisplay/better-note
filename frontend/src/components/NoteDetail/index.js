// import React, { useState, useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getNotes } from "../../store/note";
import { deleteNote, getOneNote } from "../../store/note";
// import { NavLink, Redirect, Route, Switch } from "react-router-dom";
// import NotebooksPage from "../NotebooksPage";
import { dateAdjustLogic } from "../../utils/dateAdjust";

function NoteDetail({ note}) {

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(getNotes(userId));
        //!!END
    };
    return (
        <div className={`note-${note.id} note`}>

                <div onClick={()=>{dispatch(getOneNote(note.id))}}>
                    <div className="title">{note.title}</div>
                    <div className="content">{note.content}</div>
                    <div className="updatedAt">
                        {/* {`${dateAdjustLogic(note)}`} */}
                        {note.updatedAt}
                    </div>
                </div>

            <form onSubmit={onSubmit}>
                <button
                    onClick={() => {
                        dispatch(deleteNote(note.id));
                        // setReload(!reload)
                        dispatch(getNotes(userId));
                    }}
                >
                    Delete
                </button>
            </form>
        </div>
    );
}

export default NoteDetail;
