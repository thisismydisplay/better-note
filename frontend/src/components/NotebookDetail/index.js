import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotebook, getNotebooks, getNotebookNotes } from "../../store/notebook";
import NoteDetail from "../NoteDetail";

function NotebookDetail({ notebook }) {
    const [showNotes, setShowNotes] = useState(false);
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const notebookNotes = useSelector((state)=> state.notebook.notebookNotes)
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(getNotebooks(userId));
    };

    const handleClick = () => {
        dispatch(getNotebookNotes(notebook.id))
        setShowNotes(!showNotes)

    }
    // useEffect(()=>{
    //     dispatch(getNotebookNotes(notebook.id))
    // })

    if (!notebook) {
        return null;
    }
    return (
        <div className="notebook-container">
            <div className="notebook-details">
                <div
                    className="notebook-details-text"
                    onClick={handleClick}
                >
                    <div className="title">{notebook.title}</div>
                    <div className="createdAt">{notebook.createdAt} </div>
                    <div>{notebook.updatedAt && "Updated"}</div>
                </div>
                <div className="delete-btn-form">
                    <form onSubmit={onSubmit}>
                        <button
                            className="delete-btn"
                            onClick={() => {
                                dispatch(deleteNotebook(notebook.id));
                                // setReload(!reload)
                                dispatch(getNotebooks(userId));
                            }}
                        >
                            Delete
                        </button>
                    </form>
                </div>
            </div>
            {showNotes && (<div
                className="notebook-notes"
            >
                {notebookNotes?.map((note)=>{
                    return (
                        <NoteDetail note={note} />
                    )
                })}
            </div>)}
        </div>
    );
}
export default NotebookDetail;
