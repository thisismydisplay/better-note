import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getNotes, setOneNote } from "../../store/note";
import { setFirstNotebook } from "../../store/notebook";
import CreateNoteForm from "../CreateNoteForm";
import NotesList from "../NotesList";
import EditNote from "../EditNote";
import "./NotesPage.css";
import PageHeader from "../PageHeader";

function NotesPage() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const sessionUser = useSelector((state) => state.session.user);

    const userId = sessionUser.id;

    // const orderBy = useSelector((state) => state.session.orderBy);
    useEffect(() => {
        dispatch(setFirstNotebook(userId));
    }, [dispatch, userId]);

    // const [showNotes, setShowNotes] = useState(false);

    useEffect(() => {
        async function main() {
            console.log("use effect");
            await dispatch(getNotes(userId, 'DESC'));
            await dispatch(setOneNote(id))
        }
        main();
    }, [dispatch, id, userId]);

    const notes = useSelector((state) => {
        return state.note.list;
    });
    const note = useSelector((state) => {
        return state.note.currentNote;
    });

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
                    <NotesList />
                </div>
                <div className="edit-note-container">
                    {note?.id && <EditNote note={note} />}
                </div>
                {/* <div className="create-note-form">
                </div> */}
            </div>
        </div>
    );
}
export default NotesPage;
