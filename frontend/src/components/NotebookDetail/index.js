import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteNotebook,
    getNotebooks,
    getNotebookNotes,
} from "../../store/notebook";
import NoteDetail from "../NoteDetail";
import "./NotebookDetail.css";

function NotebookDetail({ notebook, colorToggle }) {
    const [showNotes, setShowNotes] = useState(false);
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const orderBy = useSelector((state) => state.session.orderBy);

    const notebookNotes = useSelector((state) => state.notebook.notebookNotes);
    const firstNotebook = useSelector((state) => state.notebook.list[0]);
    console.log(sessionUser);
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(getNotebooks(userId));
    };

    const handleClick = () => {
        dispatch(getNotebookNotes(notebook.id, orderBy));
        setShowNotes(!showNotes);
    };
    // useEffect(()=>{
    //     colorToggle(!colorToggle)
    // }[colorToggle])

    if (!notebook) {
        return null;
    }
    return (
        <div className="notebook-container">
            <div className="notebook-details">
                <div
                    className="notebook-details-text"
                    onClick={handleClick}
                    // style={colorToggle ? {backgroundColor: '#333333'} : {backgroundColor: '#333333'}}
                >
                    {" "}
                    <div className="notebook-title-div">
                        <div className="title">{notebook.title}</div>
                    </div>
                    <div className="notebook-details-header-right">
                        <div className="createdAt">{sessionUser.username} </div>
                        <div>
                            {notebook.updatedAt &&
                                `${notebook?.updatedAt
                                    .toString()
                                    .slice(0, 10)} ${notebook?.updatedAt
                                    .toString()
                                    .slice(11, 16)} `}
                        </div>

                        <div className="delete-btn-form" >
                            {!(firstNotebook?.id === notebook?.id) && <form
                                onSubmit={onSubmit}
                                className="delete-btn delete-div"
                                onClick={async () => {
                                    await dispatch(deleteNotebook(notebook.id));
                                    // setReload(!reload)

                                    //DELETE NEEDS TO UPDATE NOTEBOOK NOTES?

                                    await dispatch(getNotebooks(userId));
                                }}
                            >
                                <img
                                    className="delete-btn trash-icon icon-img"
                                    alt="background"
                                    src="
                        /images/trashcan-icon.svg"
                                />{" "}
                                Delete
                            </form>}
                        </div>
                    </div>
                </div>
            </div>
            {showNotes && notebook?.id === notebookNotes[0]?.notebookId && (
                <div className="notebook-notes">
                    {notebookNotes?.map((note) => {
                        return <NoteDetail note={note} />;
                    })}
                </div>
            )}
        </div>
    );
}
export default NotebookDetail;
