// import { LOAD_NOTES, REMOVE_ITEM, ADD_ITEM } from './items';
// //!!START SILENT
// import note from '../../../backend/db/models/note';
import { csrfFetch } from './csrf';
import { ValidationError } from '../utils/validationError';

//!!END

const LOAD = 'notebooks/LOAD';

const ADD_ONE = 'notebooks/ADD_ONE';
// const REMOVE = 'notebooks/REMOVE'

const load = list => ({
  type: LOAD,
  list
});


const addOneNotebook = notebook => ({
  type: ADD_ONE,
  notebook
});

export const getNotebooks = () => async dispatch => {
  console.log('hi!')
    const response = await csrfFetch(`/api/notebooks`);
    console.log(response)
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

// export const getPokemonTypes = () => async dispatch => {
//   const response = await csrfFetch(`/api/pokemon/types`);

//   if (response.ok) {
//     const types = await response.json();
//     dispatch(loadTypes(types));
//   }
// };

//!!START SILENT
export const getOneNotebook = id => async dispatch => {
  const response = await csrfFetch(`/api/notebooks/${id}`);
    console.log(response)
  if (response.ok) {
    const notebook = await response.json();
    dispatch(addOneNotebook(notebook));
  }
};

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
  const response = await csrfFetch(`/api/notebook/${data.id}`, {
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

//!!END
const initialState = {
  list: [],

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
    case ADD_ONE:
      return { ...state, list: [...state.list, action.notebook]}

    //   if (!state[action.notebook.id]) {
    //     const newState = {
    //       ...state,
    //       [action.notebook.id]: action.notebook
    //     };
    //     const notebookList = newState.list.map(id => newState[id]);
    //     notebookList.push(action.notebook);
    //     newState.list = notebookList;
    //     return newState;
    //   }
    //   return {
    //     ...state,
    //     [action.notebook.id]: {
    //       ...state[action.notebook.id],
    //       ...action.notebook
    //     }
    //   };
    // case LOAD_NOTES:
    //   return {
    //     ...state,
    //     [action.notebookId]: {
    //       ...state[action.notebookId],
    //       notes: action.notes.map(note => note.id)
    //     }
    //   };
    // case REMOVE_ITEM:
    //   return {
    //     ...state,
    //     [action.noteId]: {
    //       ...state[action.noteId],
    //       notes: state[action.noteId].items.filter(
    //         (itemId) => itemId !== action.itemId
    //       )
    //     }
    //   };
    // case ADD_ITEM:
    //   console.log(action.item);
    //   return {
    //     ...state,
    //     [action.item.pokemonId]: {
    //       ...state[action.item.pokemonId],
    //       items: [...state[action.item.pokemonId].items, action.item.id]
    //     }
    //   };
    default:
      return state;
  }
}

export default notebookReducer;
