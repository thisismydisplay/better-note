import { useState, useEffect } from "react";

import { NavLink, Route, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/note";
import { setFirstNotebook } from "../../store/notebook";
import CreateNoteForm from "../CreateNoteForm";
import NotesList from '../NotesList'
// import notebook from "../../../../backend/db/models/notebook";
//!!END
//!!ADD
// import { useSelector } from 'react-redux';
//!!END_ADD
// import NotebookNotes from '../NotebookNotes';

function NotesPage() {
    const dispatch = useDispatch();
    // const { notebookId } = useParams();
    // console.log( notebookId)
    // console.log(state)
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;

    useEffect(() => {
        console.log('use effect')
        dispatch(setFirstNotebook(userId));
    }, [dispatch]);
    const notes = useSelector((state)=> {
        return state.note.list
    });
    console.log(notes)
    const [showNotes, setShowNotes] = useState(false);

    useEffect(() => {
        console.log('use effect')
        dispatch(getNotes(userId));
    }, [dispatch]);

    if (!notes) {
        return null;
    }
    return (
        <div className="notes-page-container">
        <div>
            <NotesList />
        </div>
        <div className="create-note-form">
            <CreateNoteForm />
        </div>
        </div>
    )
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
export default NotesPage;
