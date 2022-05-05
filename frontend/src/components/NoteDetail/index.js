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
import DeleteButton from "../DeleteButton";
import './NoteDetail.css'
function NoteDetail({ note, active}) {
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
        // dispatch(getOneNote(note?.id))
        // dispatch(getOneNotebook(currentNotebook?.id))
    }, [])


    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(getNotes(userId, orderBy));
        //!!END
    };
    return (
        <div className={(active ? 'note-active' : '') + ` note-${note.id} note-container`}>

                <div onClick={async ()=>{
                    history.replace('/browser/notes')
                    await dispatch(getOneNote(note.id))
                    window.scrollTo(0, 0)

                    // await dispatch(getOneNotebook(currentNotebook.id))
                    }}>
                    <div className="title">{note.title}</div>
                    <div className="content note-content">{note.content}</div>
                    <div className="note-detail-footer">
                    <div className="updatedAt">
                        {/* {`${dateAdjustLogic(note)}`} */}
                        {`${note.updatedAt.toString().slice(0, 10)} ${note.updatedAt.toString().slice(11, 16)} `}
                </div>
                    </div>
                    <DeleteButton note={note}/>
                    </div>

        </div>
    );
}

export default NoteDetail;
