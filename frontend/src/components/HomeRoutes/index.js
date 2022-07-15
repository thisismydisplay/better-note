import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from '../LoginFormPage';
import Footer from '../Footer';
import './HomePage.css';
import SignupFormPage from '../SignupFormPage';
import Error404Page from '../Error404Page';

import * as sessionActions from '../../store/session';
import HomeNavigation from '../HomeNavigation';

function HomeRoutes() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
            <HomeNavigation isLoaded={isLoaded} />
            {isLoaded && (
                <div className='home-form'>
                    <Switch>
                        <Route path='/login'>
                            <LoginFormPage />
                        </Route>
                        <Route path='/signup'>
                            <SignupFormPage />
                        </Route>
                        <Route path='/'>
                            <LoginFormPage />
                        </Route>
                        <Route path='/*'>
                            <Error404Page />
                        </Route>
                    </Switch>
                    <Footer />
                </div>
            )}
        </>
    );
}

export default HomeRoutes;
