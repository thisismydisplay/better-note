import { useState, useEffect } from "react";

import { NavLink, Route, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/note";
import NoteDetail from "../NoteDetail";
import SortButton from "../SortButton";
// import NotesList from "../NotesList";
// import notebook from "../../../../backend/db/models/notebook";
//!!END
//!!ADD
// import { useSelector } from 'react-redux';
//!!END_ADD
// import NotebookNotes from '../NotebookNotes';

function NotesList() {
    const dispatch = useDispatch();
    // const { notebookId } = useParams();
    // console.log( notebookId)
    // console.log(state)
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;

    const orderBy = useSelector((state) => state.session.orderBy);
    const notes = useSelector((state) => {
        return state.note.list;
    });
    const currentNote = useSelector((state)=> state.note.currentNote)
    console.log(notes);
    const [showNotes, setShowNotes] = useState(false);

    useEffect(() => {
        console.log("use effect");
        dispatch(getNotes(userId, orderBy));
    }, [dispatch]);

    if (!notes) {
        return null;
    }
    return (
        <div className="notes-container">
            <div className="notes-nav">
                <div className="notes-nav-top">
                    <div className="notes-nav-left">
                        <img
                            className="note-icon"
                            // id="notes-btn"

                            alt="background"
                            src="
                        /images/notes-icon.svg"
                        />
                        <span className="welcome-span">NOTES</span>
                    </div>
                    <div className="notes-nav-right">
                        <SortButton></SortButton>
                    </div>
                </div>
                <div className="notes-nav-bottom">
                    <span>Recent</span>
                    {/* <span>Suggested</span> */}
                </div>
                <div className="placeholder-for-menu-options"></div>
                <div className="note-list">
                    {notes?.map((note) => (
                        <div className="note-detail-container">
                            <NoteDetail note={note} active={currentNote?.id === note.id} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    //             <span>Notebooks</span>
    //             <div hidden={showForm} onClick={() => setShowForm(true)}>Create Notebook</div>
    //             <div className="notebook-list">
    //             {notebooks?.map((notebook) => {
    //                 return (
    //                     <NavLink key={notebook.id} to={`/notebooks/${notebook.id}`}>
    //                         <div
    //                             className={
    //                                 `notebook-${notebook.id}`
    //                             }
    //                         >
    //                             <div>
    //                                 <div className="title">{notebook.title}</div>
    //                                 <div className="createdAt">
    //                                     {notebook.createdAt}{" "}
    //                                     {notebook.updatedAt && "Updated"}
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </NavLink>
    //                 );
    //             })}
    //             </div>
    //             {showForm ? (
    //         <CreateNotebookForm hideForm={() => setShowForm(false)} />
    //       ) : (
    //         <Route path="/notebooks/:notebookId">
    //           <NotebookDetail />
    //         </Route>
    //       )}
    //         </div>
    //     );
    // }
}
export default NotesList;
