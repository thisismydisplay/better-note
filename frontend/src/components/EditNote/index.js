import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { createNote, getNotes, getOneNote, updateNote  } from '../../store/note';
import { setFirstNotebook  } from '../../store/notebook';
import { ValidationError } from '../../utils/validationError';
import ErrorMessage from '../ErrorMessage';

const EditNote = ({ note }) => {

    const currentNote = useSelector((state) => state.note.currentNote);
    const [title, setTitle] = useState(currentNote.title);
    const [content, setContent] = useState(currentNote.content);
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();
    // debugger;

    const updateTitle = (e) => {
        setTitle(e.target.value);
        dispatch(updateNote({...currentNote, title: e.target.value}))
        //debounce
    }
    const updateContent = (e) => {
        setContent(e.target.value);
        dispatch(updateNote({...currentNote, content: e.target.value}))
        //debounce
    }

    useEffect(()=> {
        setTitle(currentNote.title)
        setContent(currentNote.content)
    }, [currentNote])
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
        <form>
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
        </form>
      </div>
    </section>
  );
};

export default EditNote;
