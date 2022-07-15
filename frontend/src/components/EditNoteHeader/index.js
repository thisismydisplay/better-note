import './EditNoteHeader.css';
import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import DeleteButton from '../DeleteButton';
import Modal from '../Modal';
import ChangeNotebookForm from '../ChangeNotebookForm';

function EditNoteHeader({ note, onExpandClick = () => {} }) {
    const currentNotebook = useSelector(
        (state) => state.notebook.currentNotebook
    );
    const [showForm, setShowForm] = useState(false);

    return (
        <div className='edit-note-header'>
            <div className='edit-note-header-left'>
                <div className='expand-div header-item'>
                    <img
                        className='expand-icon icon-img'
                        onClick={onExpandClick}
                        alt='background'
                        src='/images/expand-window.svg'
                    />
                </div>
                <div className='notebook-icon-div header-item'>
                    <img
                        className='notebooks-icon icon-img'
                        alt='background'
                        src='
                        /images/notebooks.svg'
                    />
                    <span className='welcome-span'>
                        {currentNotebook?.title}
                    </span>
                </div>
            </div>
            <div className='edit-note-header-right'>
                {showForm && (
                    <Modal
                        onHide={() => {
                            setShowForm(false);
                        }}
                    >
                        <ChangeNotebookForm
                            hideForm={() => setShowForm(false)}
                        />
                    </Modal>
                )}
                <div className='move-note-btn-container'>
                    <div
                        className='move-note-icon-div header-item'
                        hidden={showForm}
                        onClick={() => setShowForm(true)}
                    >
                        <img
                            className='move-note-icon icon-img'
                            // id="notes-btn"

                            alt='background'
                            src='
                        /images/notebooks.svg'
                        />
                        <span className='move-note-span'>Move Note</span>
                    </div>
                </div>
                <DeleteButton note={note} />
            </div>
        </div>
    );
}
export default EditNoteHeader;
