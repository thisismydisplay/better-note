import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { createNote, getNotes, getOneNote, updateNote  } from '../../store/note';
import { getOneNotebook, setFirstNotebook  } from '../../store/notebook';
import { ValidationError } from '../../utils/validationError';
import ErrorMessage from '../ErrorMessage';
import EditNoteHeader from '../EditNoteHeader';
import './EditNote.css'

const EditNote = ({ note }) => {

    const currentNote = useSelector((state) => state.note.currentNote);
    const currentNotebook = useSelector((state) => state.notebook.currentNotebook)
    const [title, setTitle] = useState(currentNote.title);
    const [content, setContent] = useState(currentNote.content);
    const [notebook, setNotebook] = useState(currentNotebook);
    // const [height, setHeight] = useState('100px')
    const [errorMessages, setErrorMessages] = useState('');
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
    // const updateHeight = (e) => {

    //         setHeight(e.target.style.scrollHeight + "px")}

    useEffect(()=> {
        setTitle(currentNote.title)
        setContent(currentNote.content)
        // console.log(currentNotebook)
        console.log('=====')
        dispatch(getOneNotebook(currentNote.notebookId))
        // setNotebook(currentNotebook)
        // console.log(currentNotebook)

    }, [currentNote])
  return (
    <section className="edit-note-form not-fullscreen">
      <ErrorMessage message={errorMessages.overall} />
        <EditNoteHeader note={note} currentNote={currentNote}/>

        <div className='last-edited'>{`Last edited ${currentNote?.updatedAt.toString().slice(0, 10)}, ${currentNote?.updatedAt.toString().slice(11, 16)}`}</div>
      <div className="edit-note-form" >
        <form className='edit-inputs'>
      <input className='note-title-input'
          type="text"
          placeholder="Title"
          maxLength={100}
          value={title}
          onChange={updateTitle} />
        {/*!!START SILENT */}
        <ErrorMessage label={"Title"} message={errorMessages.title} />
        {/*!!END */}
        <textarea
        className='note-content-input'
        // oninput={updateHeight}
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
