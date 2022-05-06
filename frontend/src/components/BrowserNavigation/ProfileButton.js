import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";
function ProfileButton({sidebarOpen}) {
    const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.logout());
        history.replace("/");
    };

    return (
        <>
            <div className='account-info-div user-li profile-name-div' onClick={openMenu}>
                <img
                                className="account-icon"
                                alt="avatar"
                                src="/images/avatar-placeholder.svg"
                            />
                            <span className="username-span" style={sidebarOpen ? { display: 'flex'} : {display: 'none'}}>{user.email}</span>
                            <img
                                className="user-li"
                                alt="down-arrow"
                                src="/images/down-arrow.svg"
                                style={sidebarOpen ? { display: 'flex'} : {display: 'none'}}
                            />
            </div>
            {showMenu && (

                <ul className="profile-dropdown">
                    <div className="account-info-div">
                        <span className="user-li">ACCOUNT</span>
                        <li className="user-li">
                            <img
                                className="account-icon"
                                alt="checkmark"
                                src="/images/checkmark.svg"
                            />
                            <img
                                className="account-icon"
                                alt="avatar"
                                src="/images/avatar-placeholder.svg"
                            />
                            <span className="username-span">{user.email}</span>
                        </li>
                    </div>
                    <li className="spacer"></li>
                    <li>
                    <span className="logout-btn" onClick={logout}>Sign out {user.email}</span>

                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
