import "./PageHeader.css";
import Searchbar from "../Searchbar";
import { useLocation } from 'react-router-dom';

function PageHeader( {onSearchChange}) {
    const location = useLocation();
    return (
        <div className="notebooks-page-header">
            <span className="page-title">{location.pathname === '/browser/notes' ? 'Notes' : 'Notebooks'}</span>
            <Searchbar onSearchChange={onSearchChange} />

        </div>
    );
}

export default PageHeader;
