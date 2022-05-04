import { csrfFetch } from "./csrf";
import { ValidationError } from "../utils/validationError";

//!!END

const LOAD = "notes/LOAD";
const ADD_ONE = "notes/ADD_ONE";
const UPDATE = "notes/UPDATE";
const DELETE = "notes/DELETE";
const GET_ONE = "notes/GET_ONE";
// const GET_PARENT_NOTEBOOK = 'notes/GET_PARENT_NOTEBOOK'

const load = (list) => ({
    type: LOAD,
    list,
});

// const getParentNotebook = notebookId => ({
//     type: GET_PARENT_NOTEBOOK,
//     notebookId
// })

const deleteOne = (noteId) => ({
    type: DELETE,
    noteId,
});
const addOneNote = (note) => ({
    type: ADD_ONE,
    note,
});

const getOne = (note) => ({
    type: GET_ONE,
    note,
});
const update = (note) => ({
    type: UPDATE,
    note,
});

export const getNotes = (userId) => async (dispatch) => {
    console.log("hi!");
    const response = await csrfFetch(`/api/notes/?userId=${userId}`); //`/api/notes/?userId=${userId}&active=true&notebookId=${notebookId}`
    console.log(response);
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
};

// export const getNotebook = (note) => async dispatch => {
//     const response = await csrfFetch(`/api/notes/notebook/${note.id}`)
//     if (response.ok) {
//         const notebookId = await response.json();
//         dispatch(getParentNotebook(notebookId));
//       }
// }

export const getOneNote = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/${id}`);
    console.log(response);
    if (response.ok) {
        const note = await response.json();
        dispatch(getOne(note));
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
    console.log(response);
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

// export const updateNote = data => async dispatch => {
//   const response = await csrfFetch(`/api/notes/${data.id}`, {
//     method: 'put',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });

//   if (response.ok) {
//     const note = await response.json();
//     dispatch(addOneNote(note));
//     return note;
//   }
// };
export const deleteNote = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/${id}`, {
        method: "DELETE",
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(data)
    });

    if (response.ok) {
        const message = await response.json();
        dispatch(deleteOne(id));
        return message;
    }
};

//!!END
const initialState = {
    list: [],
    currentNote: {},
};

// const sortList = (list) => {
//   return list.sort((pokemonA, pokemonB) => {
//     return pokemonA.number - pokemonB.number;
//   }).map((pokemon) => pokemon.id);
// };

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            console.log("inside reducer");
            //   const allNotebooks = {};
            //   action.list?.forEach(notebook => {
            //     allNotebooks[notebook.id] = notebook;
            //   });
            return {
                // ...allNotebooks,
                ...state,
                list: [...action.list],
                currentNote: action.list[0] || {},
            };
        // case LOAD_TYPES:
        //   return {
        //     ...state,
        //     types: action.types
        //   };
        case GET_ONE:
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
            return { ...state, currentNote: { ...action.note } , list: newList};

        case DELETE:
            const newState = { ...state };
            delete newState[action.noteId];
            return newState;
        default:
            return state;
    }
};

export default noteReducer;
