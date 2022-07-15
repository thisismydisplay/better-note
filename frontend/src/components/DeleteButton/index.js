import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import Modal from "../Modal";
import './DeleteButton.css'
import ConfirmDelete from "../ConfirmDelete";

function DeleteButton({ note }) {

    const [showForm, setShowForm] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;

    return (
        <div className="del-btn-container">
        <div
            className="delete-div header-item"
            hidden={showForm}
            onClick={() => setShowForm(true)}
        >
            {showForm && (
                <Modal
                    onHide={() => {
                        setShowForm(false);
                    }}
                >
                    <ConfirmDelete
                        note={note}
                        userId={userId}
                        hideForm={() => setShowForm(false)}
                    />
                </Modal>
            )}
            <img
                className="delete-btn trash-icon icon-img"
                alt="background"
                src="
                        /images/trashcan-icon.svg"
            />{" "}
            Delete
        </div>
        </div>
    );
}
export default DeleteButton;
