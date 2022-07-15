import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebookNotes } from '../../store/notebook';
import NoteDetail from '../NoteDetail';
import './NotebookDetail.css';
import Modal from '../Modal';
import ConfirmDeleteNotebook from '../ConfirmDeleteNotebook';

function NotebookDetail({ notebook }) {
    const [showForm, setShowForm] = useState(false);

    const [showNotes, setShowNotes] = useState(false);
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const orderBy = useSelector((state) => state.session.orderBy);

    const notebookNotes = useSelector((state) => state.notebook.notebookNotes);
    const firstNotebook = useSelector((state) => state.notebook.list[0]);

    const handleClick = () => {
        dispatch(getNotebookNotes(notebook.id, orderBy));
        setShowNotes(!showNotes);
    };

    if (!notebook) {
        return null;
    }

    return (
        <div className='notebook-container'>
            <div className='notebook-details'>
                <div className='notebook-details-text' onClick={handleClick}>
                    {' '}
                    <div className='notebook-title-div'>
                        <div className='title'>{notebook.title}</div>
                    </div>
                    <div className='notebook-details-header-right'>
                        <div className='createdAt'>{sessionUser.username} </div>
                        <div>
                            {notebook.updatedAt &&
                                `${notebook?.updatedAt
                                    .toString()
                                    .slice(0, 10)} ${notebook?.updatedAt
                                    .toString()
                                    .slice(11, 16)} `}
                        </div>
                        <div className='delete-btn-form'>
                            {!(firstNotebook?.id === notebook?.id) && (
                                <div
                                    className='delete-btn delete-div'
                                    hidden={showForm}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowForm(true);
                                    }}
                                >
                                    {showForm && (
                                        <Modal
                                            onHide={() => {
                                                setShowForm(false);
                                            }}
                                        >
                                            <ConfirmDeleteNotebook
                                                notebook={notebook}
                                                userId={userId}
                                                hideForm={() =>
                                                    setShowForm(false)
                                                }
                                            />
                                        </Modal>
                                    )}
                                    <img
                                        className='delete-btn trash-icon icon-img'
                                        alt='background'
                                        src='
                        /images/trashcan-icon.svg'
                                    />{' '}
                                    Delete
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showNotes && notebook?.id === notebookNotes[0]?.notebookId && (
                <div className='notebook-notes note-list' key={notebook.id}>
                    {notebookNotes?.map((note) => {
                        return <NoteDetail note={note} key={note.id} />;
                    })}
                </div>
            )}
        </div>
    );
}
export default NotebookDetail;
