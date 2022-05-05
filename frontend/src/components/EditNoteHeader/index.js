import './EditNoteHeader.css'
import React, { useEffect, useState } from "react";
import { getOneNotebook } from '../../store/notebook';
import { getOneNote } from '../../store/note';
import { useDispatch, useSelector,  } from "react-redux";
// import {getOneNotebook} from '../../store/notebook'
function EditNoteHeader() {
    const dispatch = useDispatch();
    // const cN = useSelector((state)=> state.notebook.currentNotebook)
    // const [notebook, setNotebook] = useState(cN);
    // useEffect(()=>{
    //     dispatch(getOneNotebook(notebook.id))
    //     setNotebook(notebook)
    //     // dispatch(getOneNote(note.id))
    // }, [notebook])
return(
<div className="edit-note-header">
    <div className='edit-note-header-left'>
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
                        <span className="welcome-span">notebook</span>
                    </div>
                    </div>
                    <div className='edit-note-header-right'>


                    <div className="move-note-icon-div header-item">
                    <img
                            className="move-note-icon icon-img"
                            // id="notes-btn"

                            alt="background"
                            src="
                        /images/notebooks.svg"
                        />
                        <span className='move-note-span'>Move Note</span>
                    </div>
                        <div className="delete-div header-item">
                        <img
                            className="trash-icon icon-img"
                            // id="notes-btn"

                            alt="background"
                            src="
                        /images/trashcan-icon.svg"
                        />
                    </div>
                    </div>

                </div>)


}
export default EditNoteHeader
