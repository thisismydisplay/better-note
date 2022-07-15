import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getNotebooks } from '../../store/notebook';
import { deleteNotebook } from '../../store/notebook';
import { getNotebookNotes } from '../../store/notebook';
import ErrorMessage from '../ErrorMessage';

function ConfirmDeleteNotebook({ notebook, userId, hideForm }) {
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const notebookId = notebook.id;
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await dispatch(deleteNotebook(notebookId));
        await dispatch(getNotebookNotes(notebookId, 'ASC'));
        await dispatch(getNotebooks(userId, 'DESC'));
        const url = location.pathname;
        url.includes('/browser/notebooks') &&
            history.replace('/browser/notebooks');
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrorMessages({});
        hideForm();
    };
    return (
        <section
            className='create-notebook-div confirm-delete-div'
            onClick={(e) => e.stopPropagation()}
        >
            <ErrorMessage message={errorMessages.overall} />
            <form
                className='create-notebook-form confirm-delete-form'
                onSubmit={handleSubmit}
            >
                <div className='confirm-del-text'>
                    {`Are you sure you want to delete '${notebook.title}'?`}{' '}
                    <br></br>
                    This will delete all the notes in the notebook and cannot be
                    undone.
                </div>

                <button type='submit' className='form-btn create-notebook-btn'>
                    Confirm
                </button>
                <button
                    type='button'
                    className='form-btn create-notebook-btn'
                    onClick={handleCancelClick}
                >
                    Cancel
                </button>
            </form>
        </section>
    );
}

export default ConfirmDeleteNotebook;
