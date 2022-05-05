import "./NotebooksPageHeader.css";
function NotebooksPageHeader() {
    return (
        <div className="notebooks-page-header">
            <span className="page-title">Notebooks</span>
            <div className="searchbar-container">
                <input
                    className="searchbar-input"
                    type="search"
                    placeholder="Search"
                    id="searchbar-input"
                    autocomplete="off"
                ></input>
                <div className="search-icon-div">
                    <img
                        className="search-icon"
                        // id="notes-btn"

                        alt="search"
                        src="
                    /images/search-icon.svg"
                    />
                </div>
                <div className="search-dropdown">
                    <div className="dropdown-content"></div>
                </div>
            </div>
        </div>
    );
}

export default NotebooksPageHeader;
