import "./NotebooksListHeader.css";
import React, { useState, } from "react";
import CreateNotebookForm from "../CreateNotebookForm";
import Modal from "../Modal";
import { useSelector,  } from "react-redux";

import SortButton from "../SortButton";

// function Modal({ children, onHide }) {
//     const [modalEl, setModalEl] = useState(document.getElementById('modal'));
//     useEffect(() => {
//         setModalEl( document.getElementById("modal"));
//     }, []);
//     return modalEl
//         ? ReactDOM.createPortal(
//               <div className="modal-content" onClick={() => onHide()}>
//                   <div className="modal-backdrop"></div>
//                   <div className="modal-inner-content">{children}</div>
//               </div>,
//               modalEl
//           )
//         : null;
// }

function NotebooksListHeader({ notebooks }) {
    const [showForm, setShowForm] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const orderBy = useSelector((state) => state.session.orderBy);
    // const [order, setOrder] = useState(orderBy);

    // const dispatch = useDispatch();

    // useEffect(()=> {
    //     dispatch(getNotes(userId, order))
    //     dispatch(getNotebookNotes(userId, order))
    //     console.log('USE EFFECT')
    // }, [userId, order])
    return (
        <div className="notebooks-list-header">
            <div className="book-list-top">
                <span>
                    {notebooks.length === 1
                        ? "1 Notebook"
                        : `${notebooks.length} Notebooks`}
                </span>
                {showForm && (
                    <Modal
                        onHide={() => {
                            setShowForm(false);
                        }}
                    >
                        <CreateNotebookForm
                            hideForm={() => setShowForm(false)}
                        />
                    </Modal>
                )}
                <div className="book-list-top-right">
                    <div
                        className="add-notebook-container"
                        hidden={showForm}
                        onClick={() => setShowForm(true)}
                    >
                        <img
                            className="create-book-icon"
                            // id="notes-btn"

                            alt="search"
                            src="
                    /images/create-note.svg"
                        />
                        <span id="new-notebook">New Notebook</span>
                        {/* <span>sort</span> */}
                    </div>
                    <SortButton />
                </div>
            </div>
            <div className="book-list-bottom">
                <div id="title-div" className="notebook-title-div">
                    <span>TITLE</span>
                </div>
                <div className="notebook-details-header-right">
                    <span>CREATED BY</span>
                    <span>UPDATED</span>
                    <span>ACTIONS</span>
                </div>
            </div>
        </div>
    );
}

export default NotebooksListHeader;
