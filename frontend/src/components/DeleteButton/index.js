import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getNotes } from "../../store/note";
import { deleteNote} from "../../store/note";
import { getNotebookNotes } from "../../store/notebook";

function DeleteButton({ note }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const orderBy = useSelector((state) => state.session.orderBy);
    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     dispatch(getNotes(userId, orderBy));
    // };
    return (
        <div
            className="delete-div header-item"
            onClick={async (e) => {
                e.stopPropagation();
                await dispatch(deleteNote(note.id));
                await dispatch(getNotes(userId, orderBy));
                await dispatch(getNotebookNotes(note.notebookId, orderBy));
                const url=location.pathname
                url.includes('/browser/notes') && history.replace('/browser/notes')
            }}
        >
            <img
                className="delete-btn trash-icon icon-img"
                alt="background"
                src="
                        /images/trashcan-icon.svg"
            />{" "}
            Delete
        </div>
    );
}
export default DeleteButton;
