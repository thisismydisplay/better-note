// import { LOAD_NOTES, REMOVE_ITEM, ADD_ITEM } from './items';
// //!!START SILENT
// import note from '../../../backend/db/models/note';
import { csrfFetch } from './csrf';
import { ValidationError } from '../utils/validationError';

//!!END
const SET_FIRST = 'notebooks/SET_FIRST'
const LOAD = 'notebooks/LOAD';

const ADD_ONE = 'notebooks/ADD_ONE';
const DELETE = 'notebooks/DELETE'
// const REMOVE = 'notebooks/REMOVE'

const load = list => ({
  type: LOAD,
  list
});

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

export const getNotebooks = (userId) => async dispatch => {
  console.log('hi!')
    const response = await csrfFetch(`/api/notebooks/${userId}`);
    console.log(response)
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};


export const getOneNotebook = id => async dispatch => {
  const response = await csrfFetch(`/api/notebooks/${id}`);
    console.log(response)
  if (response.ok) {
    const notebook = await response.json();
    dispatch(addOneNotebook(notebook));
  }
};

export const setFirstNotebook = id => async dispatch => {
    const response = await csrfFetch(`/api/notebooks/${id}/first`)
    if (response.ok) {
        const firstNotebook = await response.json();
        dispatch(setFirst(firstNotebook))
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
    dispatch(addOneNotebook(notebook));
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
    dispatch(addOneNotebook(notebook));
    return notebook;
  }
};
export const deleteNotebook = id => async dispatch => {
  const response = await csrfFetch(`/api/notebooks/${id}`, {
    method: 'DELETE',
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
  firstNotebook: [],
};

// const sortList = (list) => {
//   return list.sort((pokemonA, pokemonB) => {
//     return pokemonA.number - pokemonB.number;
//   }).map((pokemon) => pokemon.id);
// };

const notebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
        console.log('inside reducer')
    //   const allNotebooks = {};
    //   action.list?.forEach(notebook => {
    //     allNotebooks[notebook.id] = notebook;
    //   });
      return {
        // ...allNotebooks,
        ...state,
        list: [...action.list]
      };
    // case LOAD_TYPES:
    //   return {
    //     ...state,
    //     types: action.types
    //   };
    case SET_FIRST:
        console.log('inside reducer')
    //   const allNotebooks = {};
    //   action.list?.forEach(notebook => {
    //     allNotebooks[notebook.id] = notebook;
    //   });
      return {
        // ...allNotebooks,
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
