import React, { useEffect } from "react";
import { useDispatch, useSelector,  } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getNotes } from "../../store/note";
import { deleteNote, getOneNote } from "../../store/note";
import { getNotebookNotes, getOneNotebook } from "../../store/notebook";

function DeleteButton({note}){
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const orderBy = useSelector((state) => state.session.orderBy);
    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(getNotes(userId, orderBy));
        //!!END
    };
return (<form onSubmit={onSubmit} className="delete-div header-item"
onClick={async () => {
    await dispatch(deleteNote(note.id));
    // setReload(!reload)
    await dispatch(getNotes(userId, orderBy));
    await dispatch(getNotebookNotes(note.notebookId, orderBy))
}}>
                <img
                    className="delete-btn trash-icon icon-img"
                    alt="background"
                        src="
                        /images/trashcan-icon.svg"

                /> Delete


            </form>)}
export default DeleteButton;
