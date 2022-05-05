import "./SortButton.css";
import React, { useState, useEffect, } from "react";

import { useSelector, useDispatch } from "react-redux";
import { changeSortPreference } from "../../store/session";
import {getNotes} from "../../store/note"
// import {useHistory} from 'react-router-dom'
import { getNotebookNotes } from "../../store/notebook";


function SortButton() {
    // const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const orderBy = useSelector((state) => state.session.orderBy);
    const [order, setOrder] = useState(orderBy);

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getNotes(userId, order))
        dispatch(getNotebookNotes(userId, order))
        console.log('USE EFFECT')
    }, [userId, order])
    return (<div
                        className="sort-container"

                        onClick={async () => {
                            // history.replace('/browser/notebooks')

                            await dispatch(changeSortPreference());
                            order === 'DESC' ? setOrder('ASC') : setOrder('DESC')
                        }}
                    >
                        <img
                            className="sort-icon"
                            // id="notes-btn"

                            alt="sort"
                            src="
                    /images/sort-down.svg"
                        />
                        <span id="new-notebook">Sort</span>
                        {/* <span>sort</span> */}
                    </div>)}
export default SortButton
