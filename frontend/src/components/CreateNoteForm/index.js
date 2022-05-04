import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createNote, getNotes  } from '../../store/note';
import { setFirstNotebook  } from '../../store/notebook';
import { ValidationError } from '../../utils/validationError';
import ErrorMessage from '../ErrorMessage';

const CreateNoteForm = ({ hideForm }) => {

  const [errorMessages, setErrorMessages] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('untitled');
  const [content, setContent] = useState('');
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;
  const firstNotebook = useSelector((state) => state.notebook.firstNotebook);
  const notebookId = firstNotebook.id;

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      content,
      userId,
      notebookId
    };

    let createdNote;
    try {
      createdNote = await dispatch(createNote(payload));
    } catch (error) {
      if (error instanceof ValidationError) setErrorMessages(error.errors);
      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else setErrorMessages({ overall: error.toString().slice(7) })
    }
    if (createdNote) {
      setErrorMessages({});

    //   history.push(`/browser/notes/`);
    dispatch(getNotes(userId));
    //   hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setErrorMessages({});
    // hideForm();
  };

  return (
    <section className="new-note-form-holder not-fullscreen">
      <ErrorMessage message={errorMessages.overall} />
      <form className="create-note-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Untitled"

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

        <button type="submit">Create new note</button>
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
      </form>
    </section>
  );
};

export default CreateNoteForm;
