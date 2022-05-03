// import React, { useState, useEffect } from "react";
import React from "react";
// import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
// import { NavLink, Redirect, Route, Switch } from "react-router-dom";
// import NotebooksPage from "../NotebooksPage";
import {dateAdjustLogic} from "../../utils/dateAdjust";

function DashboardNote({ note }) {
    return (
        <NavLink key={note.id} to={`/notes/${note.id}`}>
            <div className={`note-${note.id} dashboard-note`}>
                <div>
                    <div className="title">{note.title}</div>
                    <div className="content">{note.content}</div>
                    <div className="updatedAt">
                        {`${dateAdjustLogic(note)}`}
                    </div>
                </div>
            </div>
        </NavLink>
    );
}

export default DashboardNote;
