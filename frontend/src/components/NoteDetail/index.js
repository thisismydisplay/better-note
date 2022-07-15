import React from "react";

import { Link } from "react-router-dom";

import DeleteButton from "../DeleteButton";
import "./NoteDetail.css";
function NoteDetail({ note, active }) {

    return (
        <div
            className={
                (active ? "note-active" : "") +
                ` note-${note.id} note-container`
            }
        >
            <Link
            to={`/browser/notes/${note.id}`}
            style={{display: 'block', textDecoration: 'none', color: 'white'}}
            >
                <div className="title">{note.title}</div>
                <div className="content note-content">{note.content}</div>
                <div className="note-detail-footer">
                    <div className="updatedAt">
                        {`${note.updatedAt
                            .toString()
                            .slice(0, 10)} ${note.updatedAt
                            .toString()
                            .slice(11, 16)} `}
                    </div>
                </div>
            </Link>
                <DeleteButton note={note} />
        </div>
    );
}

export default NoteDetail;
