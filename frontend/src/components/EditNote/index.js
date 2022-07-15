import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { updateNote } from '../../store/note';
import { getOneNotebook } from '../../store/notebook';
// import { ValidationError } from '../../utils/validationError';
import ErrorMessage from '../ErrorMessage';
import EditNoteHeader from '../EditNoteHeader';
import './EditNote.css';

const updateContentOnServer = debounce((dispatch, currentNote, content) => {
    dispatch(updateNote({ ...currentNote, content }));
}, 400);
const updateTitleOnServer = debounce((dispatch, currentNote, title) => {
    dispatch(updateNote({ ...currentNote, title }));
}, 400);

const EditNote = ({ note, onExpandClick = () => {} }) => {
    const currentNote = useSelector((state) => state.note.currentNote);

    const [title, setTitle] = useState(currentNote.title);
    const [content, setContent] = useState(currentNote.content);
    const [errorMessages, setErrorMessages] = useState('');
    const dispatch = useDispatch();

    const updateTitle = (e) => {
        setTitle(e.target.value);
        updateTitleOnServer(dispatch, currentNote, e.target.value);
    };

    const updateContent = (e) => {
        setContent(e.target.value);
        updateContentOnServer(dispatch, currentNote, e.target.value);
    };

    useEffect(() => {
        setTitle(currentNote.title);
        setContent(currentNote.content);
        dispatch(getOneNotebook(currentNote.notebookId));
    }, [dispatch, currentNote]);
    return (
        <section className='edit-note-form not-fullscreen'>
            <ErrorMessage message={errorMessages.overall} />
            <EditNoteHeader
                note={note}
                currentNote={currentNote}
                onExpandClick={onExpandClick}
            />

            <div className='last-edited'>{`Last edited ${currentNote?.updatedAt
                .toString()
                .slice(0, 10)}, ${currentNote?.updatedAt
                .toString()
                .slice(11, 16)}`}</div>
            <div className='edit-note-form'>
                <form className='edit-inputs'>
                    <input
                        className='note-title-input'
                        type='text'
                        placeholder='Title'
                        maxLength={100}
                        value={title}
                        onChange={updateTitle}
                    />
                    <ErrorMessage
                        label={'Title'}
                        message={errorMessages.title}
                    />
                    <textarea
                        className='note-content-input'
                        placeholder='Start writing'
                        value={content}
                        onChange={updateContent}
                    />
                    <ErrorMessage
                        label={'Content'}
                        message={errorMessages.content}
                    />
                </form>
            </div>
        </section>
    );
};

export default EditNote;
