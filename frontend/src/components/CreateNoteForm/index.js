import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { changeSortPreference } from "../../store/session";
import { createNote, getNotes } from "../../store/note";
import { getNotebooks, getOneNotebook } from "../../store/notebook";
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
    // const orderBy = useSelector((state) => state.session.orderBy);
    const firstNotebook = useSelector((state) => state.notebook.firstNotebook);
    const [notebookId, setNotebookId] = useState(firstNotebook.id);
    // const [order, setOrder] = useState(orderBy);

    const updateTitle = (e) => setTitle(e.target.value);
    const updateContent = (e) => setContent(e.target.value);
    const updateNotebookId = (e) => setNotebookId(e.target.value);

    useEffect(() => {
        dispatch(getNotebooks(userId));
        dispatch(getNotes(userId, "DESC"));
    }, [dispatch, userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(getOneNotebook(notebookId));

        const payload = {
            title,
            content,
            userId,
            notebookId: Number(notebookId),
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

            await dispatch(getNotes(userId, "DESC"));
            history.replace("/browser/notes");

            hideForm();
        }
    };

    // const handleCancelClick = (e) => {
    //     e.preventDefault();
    //     setErrorMessages({});
    //     // hideForm();
    // };

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
                <ErrorMessage label={"Title"} message={errorMessages.title} />
                <textarea
                    className="create-notebook-input"
                    id="create-note-content-text"
                    placeholder="Start writing"
                    value={content}
                    onChange={updateContent}
                />
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
                    Create new note
                </button>
            </form>
        </section>
    );
};

export default CreateNoteForm;
