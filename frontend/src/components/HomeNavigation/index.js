import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./HomeNavigation.css";
import * as sessionActions from "../../store/session";
function HomeNavigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = <ProfileButton user={sessionUser} />;
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
                <button
                    type="button"
                    onClick={() =>
                        dispatch(
                            sessionActions.login({
                                credential: "demo@user.io",
                                password: "password",
                            })
                        )
                    }
                >
                    Demo User
                </button>
            </>
        );
    }

    return (
        <ul>
            <li>
                <NavLink exact to="/">
                    Home
                </NavLink>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
}

export default HomeNavigation;
