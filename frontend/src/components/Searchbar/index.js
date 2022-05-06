import './Searchbar.css'

function Searchbar() {
    return(<div className="searchbar-container">
    <input
        className="searchbar-input"
        type="search"
        placeholder="Search"
        id="searchbar-input"
        autoComplete="off"
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
</div>)
}
export default Searchbar
