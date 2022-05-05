// import React, { useState, useEffect } from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector,  } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getNotes } from "../../store/note";
import { deleteNote, getOneNote } from "../../store/note";
import { getNotebookNotes, getOneNotebook } from "../../store/notebook";
// import { NavLink, Redirect, Route, Switch } from "react-router-dom";
// import NotebooksPage from "../NotebooksPage";
import { dateAdjustLogic } from "../../utils/dateAdjust";
import './NoteDetail.css'
function NoteDetail({ note}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const currentNotebook = useSelector((state) => state.notebook.currentNotebook)

    const orderBy = useSelector((state) => state.session.orderBy);
    // const currentNotebook = useSelector((state) => state.notebook.currentNotebook)
    const currentNote = useSelector((state)=>{
        return state.note.currentNote
    })

    useEffect(()=>{
        dispatch(getOneNote(note.id))
        // dispatch(getOneNotebook(currentNotebook?.id))
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(getNotes(userId, orderBy));
        //!!END
    };
    return (
        <div className={`note-${note.id} note-container`}>

                <div onClick={async ()=>{
                    history.replace('/browser/notes')
                    await dispatch(getOneNote(note.id))
                    // await dispatch(getOneNotebook(currentNotebook.id))
                    }}>
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
                        await dispatch(getNotes(userId, orderBy));
                        await dispatch(getNotebookNotes(note.notebookId, orderBy))
                    }}
                >
                    Delete
                </button>
            </form>
        </div>
    );
}

export default NoteDetail;
