import { useSelector } from "react-redux";

import NotebookDetail from "../NotebookDetail";

function NotebooksList() {
    const notebooks = useSelector((state) => {
        return state.notebook.list;
    });

    if (!notebooks) {
        return null;
    }
    return (
        <div className="notebook-list">
            {notebooks?.map((notebook) => {
                return (
                    <div
                        className="notebook-detail"
                        id={`notebook-${notebook.id}`}
                        key={notebook.id}
                    >
                        <NotebookDetail notebook={notebook} />
                        <div></div>
                    </div>
                );
            })}
        </div>
    );
}

export default NotebooksList;
