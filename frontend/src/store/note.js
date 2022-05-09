import { csrfFetch } from "./csrf";
import { ValidationError } from "../utils/validationError";
import { DELETE as DELETE_NOTEBOOK } from "./notebook";
const LOAD = "notes/LOAD";
const ADD_ONE = "notes/ADD_ONE";
const UPDATE = "notes/UPDATE";
const DELETE = "notes/DELETE";
const SET_ONE = "notes/SET_ONE";

const load = (list) => ({
    type: LOAD,
    list,
});

const deleteOne = (noteId) => ({
    type: DELETE,
    noteId,
});
const addOneNote = (note) => ({
    type: ADD_ONE,
    note,
});

const setOne = (note) => ({
    type: SET_ONE,
    note,
});
const update = (note) => ({
    type: UPDATE,
    note,
});

export const getNotes = (userId, order) => async (dispatch) => {
    const response = await csrfFetch(
        `/api/notes/?userId=${userId}&orderBy=${order}`
    ); //`/api/notes/?userId=${userId}&active=true&notebookId=${notebookId}`
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
};

export const setOneNote = (id) => async (dispatch) => {
    console.log(id)
    const response = await csrfFetch(`/api/notes/${id}`);
    if (response.ok) {
        const note = await response.json();
        await dispatch(setOne(note));
    }
};
export const updateNote = (note) => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/${note.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    if (response.ok) {
        const note = await response.json();
        // debugger;
        dispatch(update(note));
    }
};

export const createNote = (data) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            let error;
            if (response.status === 422) {
                error = await response.json();
                throw new ValidationError(error.errors, response.statusText);
            } else {
                let errorJSON;
                error = await response.text();
                try {
                    // Check if the error is JSON, i.e., from the Pokemon server. If so,
                    // don't throw error yet or it will be caught by the following catch
                    errorJSON = JSON.parse(error);
                } catch {
                    // Case if server could not be reached
                    throw new Error(error);
                }
                throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
            }
        }

        const note = await response.json();
        dispatch(addOneNote(note));
        return note;
    } catch (error) {
        throw error;
    }
};

export const deleteNote = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        const message = await response.json();
        dispatch(deleteOne(id));
        return message;
    }
};

const initialState = {
    list: [],
    currentNote: {},
};

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_NOTEBOOK:
            if (state.currentNote?.notebookId === action.notebookId) {
                console.log('inside DELETE_NOTEBOOK')
                console.log(state.list)
                const notes = state.list.filter(n => n.notebookId !== action.notebookId)
                const note = notes[0]
                return { ...state, list: notes, currentNote: note };
            } else {
                console.log('inside else')
                console.log(state.list)
                return state;
            }
        case LOAD:
            return {
                ...state,
                list: [...action.list],
                // currentNote: action.list[0] || {},  //USE NOTEID HERE INSTEAD OF INDEX AFTER NORMALIZE
            };

        case SET_ONE:
            console.trace()
            return { ...state, currentNote: action.note };

        case ADD_ONE:
            if (!state[action.note.id]) {
                const newState = {
                    ...state,
                    [action.note.id]: action.note,
                };
                return newState;
            }
            return {
                ...state,
                [action.note.id]: {
                    ...state[action.note.id],
                    ...action.note,
                },
            };
        // return { ...state, list: [...state.list, action.note] };
        case UPDATE:
            let newList = [];
            for (const note of state.list) {
                if (note.id === action.note.id) {
                    newList.push(action.note);
                } else {
                    newList.push(note);
                }
            }
            // return { ...state, [action.note.id]: action.note };
            return { ...state, currentNote: { ...action.note }, list: newList };

        case DELETE:
            const newState = { ...state };
            delete newState[action.noteId];
            return newState;
        default:
            return state;
    }
};

export default noteReducer;
