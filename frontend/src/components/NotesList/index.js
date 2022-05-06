import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/note";
import NoteDetail from "../NoteDetail";
import SortButton from "../SortButton";

function NotesList() {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;

    const orderBy = useSelector((state) => state.session.orderBy);
    const notes = useSelector((state) => {
        return state.note.list;
    });
    const currentNote = useSelector((state) => state.note.currentNote);

    useEffect(() => {
        dispatch(getNotes(userId, orderBy));
    }, [dispatch, userId, orderBy]);

    if (!notes) {
        return null;
    }
    return (
        <div className="notes-container">
            <div className="notes-nav">
                <div className="notes-nav-top">
                    <div className="notes-nav-left">
                        <img
                            className="note-icon"
                            alt="background"
                            src="
                        /images/notes-icon.svg"
                        />
                        <span className="welcome-span">NOTES</span>
                    </div>
                    <div className="notes-nav-right">
                        <SortButton></SortButton>
                    </div>
                </div>
                <div className="notes-nav-bottom">
                    <span>Recent</span>
                </div>
                <div className="placeholder-for-menu-options"></div>
                <div className="note-list">
                    {notes?.map((note) => (
                        <div key={note.id} className="note-detail-container">
                            <NoteDetail
                                note={note}
                                active={currentNote?.id === note.id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default NotesList;
