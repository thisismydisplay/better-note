import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeSortPreference } from "../../store/session";
import { createNote, getNotes, updateNote, setOneNote } from "../../store/note";
import {
    setFirstNotebook,
    getNotebookNotes,
    getNotebooks,
    getOneNotebook,
} from "../../store/notebook";
import { ValidationError } from "../../utils/validationError";
import ErrorMessage from "../ErrorMessage";
import "../CreateNoteForm/CreateNoteForm.css";
import "../CreateNotebookForm/CreateNotebookForm.css";

function ChangeNotebookForm({hideForm}) {
    const currentNote = useSelector((state)=> state.note.currentNote)
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();


    const history = useHistory();
    // const [title, setTitle] = useState("");
    // const [content, setContent] = useState("");
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const notebooks = useSelector((state) => state.notebook.list);
    const orderBy = useSelector((state) => state.session.orderBy);
    const firstNotebook = useSelector((state) => state.notebook.firstNotebook);
    const [notebookId, setNotebookId] = useState(firstNotebook.id);
    // const [order, setOrder] = useState(orderBy);
    //   const notebookId = firstNotebook.id;

    // const updateTitle = (e) => setTitle(e.target.value);
    // const updateContent = (e) => setContent(e.target.value);
    const updateNotebookId = (e) => setNotebookId(e.target.value);

    useEffect(() => {
        // dispatch()
        // dispatch(changeSortPreference());
        //                     order === 'DESC' ? setOrder('ASC') : setOrder('DESC')
        dispatch(getOneNotebook(notebookId));
        // order === 'DESC' ? setOrder('ASC') : setOrder('DESC')
        // dispatch(getNotes(userId, "DESC"));
        // setNotebookId(notebook)
        console.log(notebookId, "-<-<");
    }, [dispatch, notebookId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(notebookId, "<<<");
        // dispatch(getOneNotebook(notebookId));
        // await dispatch(getNotebooks(userId));
        // updateNotebookId(notebookId)
        console.log(currentNote, '???')
        const payload = {
            ...currentNote,
            notebookId: Number(notebookId),
        };
        console.log(payload)

        // let createdNote;
        try {
            await dispatch(updateNote(payload));
        } catch (error) {
            if (error instanceof ValidationError)
                setErrorMessages(error.errors);
            // If error is not a ValidationError, add slice at the end to remove extra
            // "Error: "
            else setErrorMessages({ overall: error.toString().slice(7) });
        }
        // if (createdNote) {
            setErrorMessages({});

            //   history.push(`/browser/notes/`);
            await dispatch(getNotes(userId, "DESC"));
            history.replace("/browser/notes");

            //  dispatch(getOneNote(createdNote.id))
            // dispatch(getNotebookNotes(firstNotebook.id, 'DESC'));
            // dispatch(getNotebooks(userId));
            hideForm();
        // }
    };

    const handleCancelClick = (e) => {
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
                        console.log(notebook.id, "<<<");
                        return (
                            // <NavLink key={notebook.id} to={`/notebooks`}>

                            <option
                                key={notebook.id}
                                className="notebook-option"
                                id={`notebook-${notebook.id}-option`}
                                value={notebook.id}
                            >
                                {notebook.title}
                            </option>

                            // </NavLink>
                        );
                    })}
                </select>
                <button type="submit" className='form-btn create-notebook-btn'>Move note</button>
        <button type="button" className='form-btn create-notebook-btn' onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    );
}

export default ChangeNotebookForm;
