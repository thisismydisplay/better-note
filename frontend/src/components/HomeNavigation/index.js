import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './HomeNavigation.css';
import * as sessionActions from '../../store/session';
function HomeNavigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = <ProfileButton user={sessionUser} />;
    } else {
        sessionLinks = (
            <>
                <NavLink className='nav-btn' to='/login'>
                    Log In
                </NavLink>
                <NavLink className='nav-btn' to='/signup'>
                    Sign Up
                </NavLink>
                <button
                    className='nav-btn'
                    type='button'
                    onClick={() =>
                        dispatch(
                            sessionActions.login({
                                credential: 'demo@user.io',
                                password: 'password',
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
        <ul className='home-nav'>
            <div className='home-top-left'>
                <NavLink className='nav-btn' exact to='/'>
                    <img
                        className='home-icon'
                        alt='background'
                        src='
                        /images/betternote-logo.svg'
                    />
                    BetterNote
                </NavLink>
            </div>
            <div className='home-top-right'>{isLoaded && sessionLinks}</div>
        </ul>
    );
}

export default HomeNavigation;
