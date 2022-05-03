import { useState, useEffect } from "react";

import { NavLink, Route, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getNotebooks } from "../../store/notebook";
import CreateNotebookForm from "../CreateNotebookForm";
import NotebookDetail from '../NotebookDetail'
// import notebook from "../../../../backend/db/models/notebook";
//!!END
//!!ADD
// import { useSelector } from 'react-redux';
//!!END_ADD
// import NotebookNotes from '../NotebookNotes';

function NotebooksPage() {
    const dispatch = useDispatch();
    // const { notebookId } = useParams();
    // console.log( notebookId)
    // console.log(state)
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const notebooks = useSelector((state)=> {
        return state.notebook.list
    });
    console.log(notebooks)
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        console.log('use effect')
        dispatch(getNotebooks(userId));
    }, [dispatch]);

    if (!notebooks) {
        return null;
    }
    return (
        <div>
            <span>Notebooks</span>
            <div hidden={showForm} onClick={() => setShowForm(true)}>Create Notebook</div>
            <div className="notebook-list">
            {notebooks?.map((notebook) => {
                return (
                    <NavLink key={notebook.id} to={`/notebooks/${notebook.id}`}>
                        <div
                            className={
                                `notebook-${notebook.id}`
                            }
                        >
                            <div>
                                <div className="title">{notebook.title}</div>
                                <div className="createdAt">
                                    {notebook.createdAt}{" "}
                                    {notebook.updatedAt && "Updated"}
                                </div>
                            </div>
                        </div>
                    </NavLink>
                );
            })}
            </div>
            {showForm ? (
        <CreateNotebookForm hideForm={() => setShowForm(false)} />
      ) : (
        <Route path="/notebooks/:notebookId">
          <NotebookDetail />
        </Route>
      )}
        </div>
    );
}

export default NotebooksPage;
