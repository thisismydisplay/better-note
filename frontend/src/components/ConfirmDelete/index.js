import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getNotes } from "../../store/note";
import { deleteNote } from "../../store/note";
import { getNotebookNotes } from "../../store/notebook";
import ErrorMessage from '../ErrorMessage';

function ConfirmDelete({ note, userId, hideForm }) {
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await dispatch(deleteNote(note.id));
        await dispatch(getNotes(userId, "DESC"));
        await dispatch(getNotebookNotes(note.notebookId, "DESC"));
        const url = location.pathname;
        url.includes("/browser/notes") && history.replace("/browser/notes");
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrorMessages({});
        hideForm();
    };
    return (
        <section
            className="create-notebook-div confirm-delete-div"
            onClick={(e) => e.stopPropagation()}
        >
            <ErrorMessage message={errorMessages.overall} />
            <form
                className="create-notebook-form confirm-delete-form"
                onSubmit={handleSubmit}
            >
                <div className="confirm-del-text">
                    {`Are you sure you want to delete '${note.title}'?`} <br></br>
                    This action cannot be undone.
                </div>

                <button
                    type="submit"
                    className="form-btn create-notebook-btn"
                >
                    Confirm
                </button>
                <button
                    type="button"
                    className="form-btn create-notebook-btn"
                    onClick={handleCancelClick}
                >
                    Cancel
                </button>
            </form>
        </section>
    );
}

export default ConfirmDelete;
