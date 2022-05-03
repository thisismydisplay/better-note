

import "./NotebooksListHeader.css";
function NotebooksListHeader({notebooks}) {
    return (
        <div className="notebooks-list-header">
            <div className="top">
            <span>{`${notebooks.length} Notebooks`}</span>
            <span>New Notebook</span>
            <span>sort</span>
            </div>
            <div className="bottom">
                <span>TITLE</span>
                <span>CREATED BY</span>
                <span>UPDATED</span>
                <span>ACTIONS</span>
                {/* <span>ACTIONS</span> */}
            </div>
        </div>
    );
}

export default NotebooksListHeader;
