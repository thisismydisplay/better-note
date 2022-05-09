import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNotebook, getNotebooks } from '../../store/notebook';
import { ValidationError } from '../../utils/validationError';
import ErrorMessage from '../ErrorMessage';
import './CreateNotebookForm.css'

const CreateNotebookForm = ({ hideForm }) => {
  const [errorMessages, setErrorMessages] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;


  const updateTitle = (e) => setTitle(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      userId,
    };

    let createdNotebook;
    try {
      createdNotebook = await dispatch(createNotebook(payload));
    } catch (error) {
      if (error instanceof ValidationError) setErrorMessages(error.errors);
      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else setErrorMessages({ overall: error.toString().slice(7) })
    }
    if (createdNotebook) {
      setErrorMessages({});
      history.push(`/browser/notebooks/`);
    dispatch(getNotebooks(userId));
      hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setErrorMessages({});
    hideForm();
  };

  return (
    <section className="create-notebook-div" onClick={(e)=> e.stopPropagation()}>
      <ErrorMessage message={errorMessages.overall} />
      <form className="create-notebook-form" onSubmit={handleSubmit}>

        <input
        className='create-notebook-input'
          type="text"
          placeholder="Untitled"
          required
          value={title}
          onChange={updateTitle} />
        <ErrorMessage label={"Title"} message={errorMessages.title} />

        <button type="submit" className='form-btn create-notebook-btn'>Create new notebook</button>
        <button type="button" className='form-btn create-notebook-btn' onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default CreateNotebookForm;
