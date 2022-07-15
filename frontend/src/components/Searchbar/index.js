import './Searchbar.css';

function Searchbar({ onSearchChange }) {
    return (
        <div className='searchbar-container'>
            <input
                className='searchbar-input'
                type='search'
                onChange={(e) => {
                    onSearchChange && onSearchChange(e.target.value);
                }}
                placeholder='Search'
                id='searchbar-input'
                autoComplete='off'
            ></input>
            <div className='search-icon-div'>
                <img
                    className='search-icon'
                    alt='search'
                    src='
        /images/search-icon.svg'
                />
            </div>
            <div className='search-dropdown'>
                <div className='dropdown-content'></div>
            </div>
        </div>
    );
}
export default Searchbar;
