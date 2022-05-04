import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { createNote, getNotes, getOneNote, updateNote  } from '../../store/note';
import { setFirstNotebook  } from '../../store/notebook';
import { ValidationError } from '../../utils/validationError';
import ErrorMessage from '../ErrorMessage';

const EditNote = ({ note }) => {

    const currentNote = useSelector((state) => state.note.currentNote);
    const dispatch = useDispatch();
    const [title, setTitle] = useState(currentNote.title);
    const [content, setContent] = useState(currentNote.content);
    const [errorMessages, setErrorMessages] = useState({});
    // const [payload, setPayload] = useState({})

    useEffect(() => {
        dispatch(getOneNote(currentNote.id))
        let updatedNote = {
            ...currentNote,
            title
        }
        dispatch(updateNote(updatedNote))
    }, [dispatch, note.id])

    // const history = useHistory();
    // const sessionUser = useSelector((state) => state.session.user);
    // const userId = sessionUser.id;
    // const firstNotebook = useSelector((state) => state.notebook.firstNotebook);
    // const notebookId = firstNotebook.id;

    const updateTitle = (e) => {
        setTitle(e.target.value);
        // setPayload({title, currentNote.content})

    }
    const updateContent = (e) => setContent(e.target.value);





//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       title,
//       content,
//       userId,
//       notebookId
//     };

//     let createdNote;
//     try {
//       createdNote = await dispatch(createNote(payload));
//     } catch (error) {
//       if (error instanceof ValidationError) setErrorMessages(error.errors);
//       // If error is not a ValidationError, add slice at the end to remove extra
//       // "Error: "
//       else setErrorMessages({ overall: error.toString().slice(7) })
//     }
//     if (createdNote) {
//       setErrorMessages({});

//     //   history.push(`/browser/notes/`);
//     dispatch(getNotes(userId));
//       hideForm();
//     }
//   };

//   const handleCancelClick = (e) => {
//     e.preventDefault();
//     setErrorMessages({});
//     hideForm();
//   };

  return (
    <section className="new-note-form-holder not-fullscreen">
      <ErrorMessage message={errorMessages.overall} />
        <div className='edit-note-header'>
            <span>Expand</span>
            <span>Notebook</span>
            <span>Move Note</span>
            <span>Delete</span>
        </div>
        <div>{`Last edited ${currentNote.updatedAt}`}</div>
      <div className="edit-note-form" >

      <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={updateTitle} />
        {/*!!START SILENT */}
        <ErrorMessage label={"Title"} message={errorMessages.title} />
        {/*!!END */}
        <textarea
            placeholder='Start writing'
            value={content}
            onChange={updateContent}
        />
        {/*!!END */}
        <ErrorMessage label={"Content"} message={errorMessages.content} />

      </div>
    </section>
  );
};

export default EditNote;
