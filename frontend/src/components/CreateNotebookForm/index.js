import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNotebook, getNotebooks, setFirstNotebook  } from '../../store/notebook';
import { ValidationError } from '../../utils/validationError';
import ErrorMessage from '../ErrorMessage';

const CreateNotebookForm = ({ hideForm }) => {
  const [errorMessages, setErrorMessages] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('untitled');
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
    //!!START SILENT
    try {
      createdNotebook = await dispatch(createNotebook(payload));
    } catch (error) {
      if (error instanceof ValidationError) setErrorMessages(error.errors);
      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else setErrorMessages({ overall: error.toString().slice(7) })
    }
    //!!END
    if (createdNotebook) {
      //!!START SILENT
      setErrorMessages({});
      //!!END
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
    <section className="new-form-holder centered middled" onClick={(e)=> e.stopPropagation()}>
      <ErrorMessage message={errorMessages.overall} />
      <form className="create-notebook-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Untitled"
          required
          value={title}
          onChange={updateTitle} />
        {/*!!START SILENT */}
        <ErrorMessage label={"Title"} message={errorMessages.title} />
        {/*!!END */}

        {/*!!END */}
        <button type="submit">Create new notebook</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default CreateNotebookForm;
