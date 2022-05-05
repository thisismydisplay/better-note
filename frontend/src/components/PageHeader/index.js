import "./PageHeader.css";
import Searchbar from "../Searchbar";
import { useLocation } from 'react-router-dom';

function PageHeader() {
    const location = useLocation();
    console.log("-----")
    console.log(location)
    return (
        <div className="notebooks-page-header">
            <span className="page-title">{location.pathname === '/browser/notes' ? 'Notes' : 'Notebooks'}</span>
            <Searchbar />

        </div>
    );
}

export default PageHeader;
