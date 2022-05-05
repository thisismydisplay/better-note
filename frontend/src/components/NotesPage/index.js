import { useState, useEffect } from "react";

import { NavLink, Route, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/note";
import { setFirstNotebook } from "../../store/notebook";
import CreateNoteForm from "../CreateNoteForm";
import NotesList from "../NotesList";
import EditNote from "../EditNote";
import "./NotesPage.css";
import PageHeader from "../PageHeader";
// import notebook from "../../../../backend/db/models/notebook";
//!!END
//!!ADD
// import { useSelector } from 'react-redux';
//!!END_ADD
// import NotebookNotes from '../NotebookNotes';

function NotesPage() {
    const dispatch = useDispatch();
    // const { notebookId } = useParams();
    // console.log( notebookId)
    // console.log(state)
    const sessionUser = useSelector((state) => state.session.user);
    // const currentNote = useSelector((state) => state.note.currentNote)
    const userId = sessionUser.id;

    const orderBy = useSelector((state) => state.session.orderBy);
    useEffect(() => {
        console.log("use effect");
        dispatch(setFirstNotebook(userId));
    }, [dispatch]);

    // const [showNotes, setShowNotes] = useState(false);

    useEffect(() => {
        console.log("use effect");
        dispatch(getNotes(userId, 'DESC'));
    }, [dispatch]);

    const notes = useSelector((state) => {
        return state.note.list;
    });
    const note = useSelector((state) => {
        return state.note.currentNote;
    });
    // const [currentNote, setCurrentNote] = useState(note);

    // useEffect(()=>{
    //     setCurrentNote(note)
    // })

    if (!notes || !notes.length) {
        return (
            <div className="create-note-form">
                <CreateNoteForm />
            </div>
        );
    }
    return (
        <div className="page-container">
            <div className="header-container">
                <PageHeader />
            </div>
            <div className="body-container">
                <div>
                    {/* <NotesList changeNote={(note) => setCurrentNote(note)}/> */}
                    <NotesList />
                </div>
                <div className="edit-note-container">
                    {note?.id && <EditNote note={note} />}
                </div>
                <div className="create-note-form">
                    {/* <CreateNoteForm /> */}
                </div>
            </div>
        </div>
    );
}
export default NotesPage;
