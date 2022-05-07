import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getNotebooks } from "../../store/notebook";
import NotebooksList from "../NotebooksList";
import NotebooksListHeader from "../NotebooksListHeader";
import PageHeader from "../PageHeader";

function NotebooksPage() {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const notebooks = useSelector((state) => {
        return state.notebook.list;
    });
    // const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        dispatch(getNotebooks(userId));
    }, [dispatch, userId]);

    if (!notebooks) {
        return null;
    }
    return (
        <div className="page-container">
            <div className="header-container">
                <PageHeader />
            </div>

            <NotebooksListHeader notebooks={notebooks} />

            <NotebooksList />
        </div>
    );
}

export default NotebooksPage;
