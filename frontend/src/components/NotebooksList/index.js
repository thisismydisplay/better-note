import { deleteNotebook, getNotebooks } from "../../store/notebook";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import NotebookDetail from "../NotebookDetail";

function NotebooksList() {
    // const [reload, setReload] = useState(false)

    const history = useHistory
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;

    const notebooks = useSelector((state) => {
        return state.notebook.list;
    });
    console.log(notebooks);
    const [showForm, setShowForm] = useState(false);
    // const [colorToggle, setColorToggle] = useState(false)

    // useEffect(() => {
    //     console.log("use effect");
    //     dispatch(getNotebooks(userId));
    // }, [dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(getNotebooks(userId));
      }

    if (!notebooks) {
        return null;
    }
    return (

        <div className="notebook-list">
            {notebooks?.map((notebook) => {
                return (
                    // <NavLink key={notebook.id} to={`/notebooks`}>

                    <div className='notebook-detail' id={`notebook-${notebook.id}` } key={notebook.id}>
                        <NotebookDetail notebook={notebook} />
                        <div>

                        </div>
                    </div>
                    // </NavLink>
                );
            })}
        </div>
    );
}

export default NotebooksList;
