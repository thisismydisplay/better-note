
import { csrfFetch } from './csrf';
import { ValidationError } from '../utils/validationError';

const SET_FIRST = 'notebooks/SET_FIRST'
const LOAD = 'notebooks/LOAD';
const LOAD_NOTEBOOK_NOTES = 'notes/LOAD_NOTEBOOK_NOTES'

const ADD_ONE = 'notebooks/ADD_ONE';
const DELETE = 'notebooks/DELETE'
const LOAD_ONE = 'notebooks/LOAD_ONE'

const load = list => ({
  type: LOAD,
  list
});

const loadOne = notebook => ({
    type: LOAD_ONE,
    notebook
})
const loadNotebookNotes = list => ({
    type: LOAD_NOTEBOOK_NOTES,
    list
})
const setFirst = notebook => ({
    type: SET_FIRST,
    notebook
})

const deleteOne = notebookId => ({
    type: DELETE,
    notebookId
})


const addOneNotebook = notebook => ({
  type: ADD_ONE,
  notebook
});

export const getNotebookNotes = (notebookId, orderBy) => async dispatch => {
      const response = await csrfFetch(`/api/notebooks/${notebookId}/notes/?orderBy=${orderBy}`);
    if (response.ok) {
      const list = await response.json();
      await dispatch(loadNotebookNotes(list));
    }
  };


export const getNotebooks = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/notebooks/?userId=${userId}`);
  if (response.ok) {
    const list = await response.json();
   await dispatch(load(list));
  }
};


export const getOneNotebook = id => async dispatch => {

  const response = await csrfFetch(`/api/notebooks/${id}`);
  if (response.ok) {
    const notebook = await response.json();
    await dispatch(loadOne(notebook));
  }
};

export const setFirstNotebook = id => async dispatch => {
    const response = await csrfFetch(`/api/notebooks/${id}/first`)
    if (response.ok) {
        const firstNotebook = await response.json();
        await dispatch(setFirst(firstNotebook))
    }
}

export const createNotebook = data => async dispatch => {
  try {
    const response = await csrfFetch(`/api/notebooks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      let error;
      if (response.status === 422) {
        error = await response.json();
        throw new ValidationError(error.errors, response.statusText);
      }
      else {
        let errorJSON;
        error = await response.text();
        try {
          // Check if the error is JSON, i.e., from the Pokemon server. If so,
          // don't throw error yet or it will be caught by the following catch
          errorJSON = JSON.parse(error);
        }
        catch {
          // Case if server could not be reached
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }
    }

    const notebook = await response.json();
    await dispatch(addOneNotebook(notebook));
    return notebook;
  }
  catch (error) {
    throw error;
  }
};

export const updateNotebook = data => async dispatch => {
  const response = await csrfFetch(`/api/notebooks/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const notebook = await response.json();
    await dispatch(addOneNotebook(notebook));
    return notebook;
  }
};
export const deleteNotebook = id => async dispatch => {
  const response = await csrfFetch(`/api/notebooks/${id}`, {
    method: 'DELETE',

  });

  if (response.ok) {
    const message = await response.json();
    await dispatch(deleteOne(id));
        return message;
  }
};

const initialState = {
  list: [],
  firstNotebook: [],
  notebookNotes: [],
  currentNotebook: {}
};

const notebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:

      return {
        ...state,
        list: [...action.list]
      };

    case LOAD_ONE:
        return { ...state, currentNotebook: action.notebook}
    case LOAD_NOTEBOOK_NOTES:
        return {
            ...state,
            notebookNotes: [...action.list]
          };
    case SET_FIRST:

      return {
        ...state,
        firstNotebook: action.notebook
      };
    case ADD_ONE:
      return { ...state, list: [...state.list, action.notebook]}

    case DELETE:
      const newState = {...state};
      delete newState[action.notebookId]
      return newState;
    default:
      return state;
  }
}

export default notebookReducer;
