import "./EditNoteHeader.css";
import React, { useEffect, useState } from "react";
import { getOneNotebook } from "../../store/notebook";
import { getOneNote } from "../../store/note";
import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "../DeleteButton";
import Modal from "../Modal";
import ChangeNotebookForm from "../ChangeNotebookForm";
import CreateNoteForm from "../CreateNoteForm";

// import {getOneNotebook} from '../../store/notebook'
function EditNoteHeader({ note }) {
    const currentNotebook = useSelector(
        (state) => state.notebook.currentNotebook
    );
    // const [notebook, setNotebook] = useState(cNotebook);
    const [showForm, setShowForm] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log(currentNotebook, "++++++++++++");

        dispatch(getOneNotebook(note.id));
        // setNotebook(currentNotebook)
        // console.log(currentNotebook)
    }, [note]);
    // const cN = useSelector((state)=> state.notebook.currentNotebook)
    // // console.log(cN)
    // const [notebook, setNotebook] = useState(currentNotebook);
    // useEffect(()=>{
    //     dispatch(getOneNotebook(currentNotebook.id))
    //     setNotebook(notebook)
    //     // dispatch(getOneNote(note.id))
    // }, [notebook])
    return (
        <div className="edit-note-header">
            <div className="edit-note-header-left">
                <div className="expand-div header-item">
                    <img
                        className="expand-icon icon-img"
                        // id="notes-btn"

                        alt="background"
                        src="
                        /images/expand-window.svg"
                    />
                </div>
                <div className="notebook-icon-div header-item">
                    <img
                        className="notebooks-icon icon-img"
                        // id="notes-btn"

                        alt="background"
                        src="
                        /images/notebooks.svg"
                    />
                    <span className="welcome-span">
                        {currentNotebook?.title}
                    </span>
                </div>
            </div>
            <div className="edit-note-header-right">
                {showForm && (
                    <Modal
                        onHide={() => {
                            setShowForm(false);
                        }}
                    >
                        <ChangeNotebookForm
                            hideForm={() => setShowForm(false)}
                        />
                    </Modal>
                )}
                <div
                    className="move-note-icon-div header-item"
                    hidden={showForm}
                    onClick={() => setShowForm(true)}
                >
                    <img
                        className="move-note-icon icon-img"
                        // id="notes-btn"

                        alt="background"
                        src="
                        /images/notebooks.svg"
                    />
                    <span className="move-note-span">Move Note</span>
                </div>
                <DeleteButton note={note} />
                {/* <div className="delete-div header-item">
                    <img
                        className="trash-icon icon-img"
                        // id="notes-btn"

                        alt="background"
                        src="
                        /images/trashcan-icon.svg"
                    />
                </div> */}
            </div>
        </div>
    );
}
export default EditNoteHeader;
