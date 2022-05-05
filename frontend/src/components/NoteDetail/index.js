// import React, { useState, useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getNotes } from "../../store/note";
import { deleteNote, getOneNote } from "../../store/note";
import { getNotebookNotes } from "../../store/notebook";
// import { NavLink, Redirect, Route, Switch } from "react-router-dom";
// import NotebooksPage from "../NotebooksPage";
import { dateAdjustLogic } from "../../utils/dateAdjust";
import './NoteDetail.css'
function NoteDetail({ note}) {

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const currentNotebookId = useSelector((state) => state.notebook)

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(getNotes(userId));
        //!!END
    };
    return (
        <div className={`note-${note.id} note-container`}>

                <div onClick={()=>{dispatch(getOneNote(note.id))}}>
                    <div className="title">{note.title}</div>
                    <div className="content">{note.content}</div>
                    <div className="updatedAt">
                        {/* {`${dateAdjustLogic(note)}`} */}
                        {`${note.updatedAt.toString().slice(0, 10)} ${note.updatedAt.toString().slice(11, 16)} `}
                    </div>
                </div>

            <form onSubmit={onSubmit}>
                <button
                    className="delete-btn"
                    onClick={async () => {
                        await dispatch(deleteNote(note.id));
                        // setReload(!reload)
                        await dispatch(getNotes(userId));
                        await dispatch(getNotebookNotes(note.notebookId))
                    }}
                >
                    Delete
                </button>
            </form>
        </div>
    );
}

export default NoteDetail;
