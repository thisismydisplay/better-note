import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { changeSortPreference } from "../../store/session";
import { getNotes, updateNote, setOneNote } from "../../store/note";
import { getNotebooks, getOneNotebook } from "../../store/notebook";
import { ValidationError } from "../../utils/validationError";
import ErrorMessage from "../ErrorMessage";
import "../CreateNoteForm/CreateNoteForm.css";
import "../CreateNotebookForm/CreateNotebookForm.css";

function ChangeNotebookForm({ hideForm }) {
    const currentNote = useSelector((state) => state.note.currentNote);
    const noteId = currentNote.id
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();

    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const notebooks = useSelector((state) => state.notebook.list);
    // const orderBy = useSelector((state) => state.session.orderBy);
    const firstNotebook = useSelector((state) => state.notebook.firstNotebook);
    const [notebookId, setNotebookId] = useState(firstNotebook.id);

    const updateNotebookId = (e) => setNotebookId(e.target.value);

    useEffect(() => {
        dispatch(getOneNotebook(notebookId));
        dispatch(getNotebooks(userId))
    }, [dispatch, notebookId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...currentNote,
            notebookId: Number(notebookId),
        };

        try {
            await dispatch(updateNote(payload));
        } catch (error) {
            if (error instanceof ValidationError)
                setErrorMessages(error.errors);
            // If error is not a ValidationError, add slice at the end to remove extra
            // "Error: "
            else setErrorMessages({ overall: error.toString().slice(7) });
        }
        setErrorMessages({});

        //   history.push(`/browser/notes/`);
        await dispatch(getNotes(userId, "DESC"));
        history.replace("/browser/notes");

        hideForm();
    };

    const handleCancelClick = (e) => {
        // history.goBack()
        dispatch(setOneNote(noteId));

        history.replace(`/browser/notes/${noteId}`);

        e.preventDefault();
        setErrorMessages({});
        hideForm();
    };

    return (
        <section
            className="create-notebook-div not-fullscreen"
            onClick={(e) => e.stopPropagation()}
        >
            <ErrorMessage message={errorMessages.overall} />
            <form className="create-note-form" onSubmit={handleSubmit}>
                <select
                    className="notebook-choice create-notebook-input"
                    onChange={updateNotebookId}
                    value={notebookId}
                >
                    {notebooks?.map((notebook) => {
                        return (
                            <option
                                key={notebook.id}
                                className="notebook-option"
                                id={`notebook-${notebook.id}-option`}
                                value={notebook.id}
                            >
                                {notebook.title}
                            </option>
                        );
                    })}
                </select>
                <button type="submit" className="form-btn create-notebook-btn">
                    Move note
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

export default ChangeNotebookForm;
