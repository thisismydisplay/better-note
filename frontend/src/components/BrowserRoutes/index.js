import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import  NotebooksPage  from '../NotebooksPage'
import  DashboardPage  from '../DashboardPage'
import { setFirstNotebook } from "../../store/notebook";
import { getNotes } from "../../store/note";
import BrowserNavigation from "../BrowserNavigation";
import "./BrowserRoutes.css";
import NotesPage from "../NotesPage"
import Footer from "../Footer"





function BrowserRoutes() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const [isLoaded, setIsLoaded] = useState(false);
    // const orderBy = useSelector((state) => state.session.orderBy);
    const notes = useSelector((state)=> state.note.list)
    useEffect(() => {
        console.log('use effect')
        dispatch(setFirstNotebook(userId));
    }, [dispatch, userId]);
    useEffect(() => {
        async function main() {
            await dispatch(getNotes(userId, 'DESC'));
            setIsLoaded(true)
            console.log('main use effect')
        }
        main();

    }, [dispatch]);

    const [showBrowserNav, setShowBrowserNav] = useState(false);
    return (
        //conditionally render dashboard, notebooks, notes, or tags
        isLoaded && <div>
            <div>
                <BrowserNavigation sidebarOpen={showBrowserNav} />
            </div>
            <div
                className="browser-div"
                style={
                    showBrowserNav
                        ? { marginLeft: "208px" }
                        : { marginLeft: "60px" }
                }
            >
                <Switch>
                    <Route path="/browser/dashboard">
                        <DashboardPage />
                    </Route>
                    <Route path="/browser/notes/:id">
                        <NotesPage />
                    </Route>
                    <Route path="/browser/notes/new">
                        <NotesPage />
                    </Route>
                    <Route path="/browser/notes" exact>
                        <Redirect to={notes.length ? `/browser/notes/${notes[0].id}` : '/browser/notes/new'}/>
                    </Route>
                    <Route path="/browser/notebooks">
                        <NotebooksPage />
                    </Route>
                    <Route path="/browser/tags">
                        {/* <TagsPage /> */}
                        <DashboardPage />
                    </Route>
                    <Route path="/">
                        <Redirect to="/browser/dashboard" />
                    </Route>
                </Switch>
            </div>
            <div
                className="showSidebar-div"
                style={
                    showBrowserNav
                        ? {
                              marginLeft: "188px",
                          }
                        : {
                              marginLeft: "40px",
                          }
                }
                onClick={() => setShowBrowserNav(!showBrowserNav)}
            >
                <img
                    className="showSidebar-img"
                    alt="closeSidebar"
                    src={
                        showBrowserNav
                            ? "/images/left-arrow.svg"
                            : "/images/right-arrow.svg"
                    }
                />
            </div>
            <Footer />
        </div>
    );
}

export default BrowserRoutes;
