import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeSortPreference } from "../../store/session";
import { createNote, getNotes, setOneNote } from "../../store/note";
import {
    setFirstNotebook,
    getNotebookNotes,
    getNotebooks,
    getOneNotebook,
} from "../../store/notebook";
import { ValidationError } from "../../utils/validationError";
import ErrorMessage from "../ErrorMessage";
import "./CreateNoteForm.css";
import "../CreateNotebookForm/CreateNotebookForm.css";

const CreateNoteForm = ({ hideForm }) => {
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const notebooks = useSelector((state) => state.notebook.list);
    const orderBy = useSelector((state) => state.session.orderBy);
    const firstNotebook = useSelector((state) => state.notebook.firstNotebook);
    const [notebookId, setNotebookId] = useState(firstNotebook.id);
    const [order, setOrder] = useState(orderBy);
    //   const notebookId = firstNotebook.id;

    const updateTitle = (e) => setTitle(e.target.value);
    const updateContent = (e) => setContent(e.target.value);
    const updateNotebookId = (e) => setNotebookId(e.target.value);

    useEffect(() => {
        // dispatch()
        // dispatch(changeSortPreference());
        //                     order === 'DESC' ? setOrder('ASC') : setOrder('DESC')
        dispatch(getNotebooks(userId));
        // order === 'DESC' ? setOrder('ASC') : setOrder('DESC')
        dispatch(getNotes(userId, 'DESC'))
        // setNotebookId(notebook)
        console.log(notebookId, '-<-<')
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(notebookId, '<<<')
        dispatch(getOneNotebook(notebookId))
        // await dispatch(getNotebooks(userId));
        // updateNotebookId(notebookId)
        const payload = {
            title,
            content,
            userId,
            notebookId: Number(notebookId)
        };

        let createdNote;
        try {
            createdNote = await dispatch(createNote(payload));
        } catch (error) {
            if (error instanceof ValidationError)
                setErrorMessages(error.errors);
            // If error is not a ValidationError, add slice at the end to remove extra
            // "Error: "
            else setErrorMessages({ overall: error.toString().slice(7) });
        }
        if (createdNote) {
            setErrorMessages({});

            //   history.push(`/browser/notes/`);
            await dispatch(getNotes(userId, 'DESC'));
            history.replace('/browser/notes')

            //  dispatch(getOneNote(createdNote.id))
            // dispatch(getNotebookNotes(firstNotebook.id, 'DESC'));
            // dispatch(getNotebooks(userId));
            hideForm();
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrorMessages({});
        // hideForm();
    };

    return (
        <section
            className="create-notebook-div not-fullscreen"
            onClick={(e) => e.stopPropagation()}
        >
            <ErrorMessage message={errorMessages.overall} />
            <form className="create-note-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Untitled"
                    className="create-notebook-input"
                    value={title}
                    onChange={updateTitle}
                />
                {/*!!START SILENT */}
                <ErrorMessage label={"Title"} message={errorMessages.title} />
                {/*!!END */}
                <textarea
                    className="create-notebook-input"
                    id="create-note-content-text"
                    placeholder="Start writing"
                    value={content}
                    onChange={updateContent}
                />
                {/*!!END */}
                <ErrorMessage
                    label={"Content"}
                    message={errorMessages.content}
                />
                <select
                    className="notebook-choice create-notebook-input"
                    onChange={updateNotebookId}
                    value={notebookId}
                >
                    {notebooks?.map((notebook) => {
                        console.log(notebook.id, '<<<')
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
                <button type="submit" className="form-btn create-notebook-btn">
                    Create new note
                </button>
                {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
            </form>
        </section>
    );
};

export default CreateNoteForm;
