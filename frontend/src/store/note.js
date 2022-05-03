import { csrfFetch } from './csrf';
import { ValidationError } from '../utils/validationError';


//!!END

const LOAD = 'notes/LOAD';

const ADD_ONE = 'notes/ADD_ONE';
const DELETE = 'notes/DELETE'


const load = list => ({
  type: LOAD,
  list
});

const deleteOne = noteId => ({
    type: DELETE,
    noteId
})
const addOneNote = note => ({
  type: ADD_ONE,
  note
});

export const getNotes = (userId) => async dispatch => {
  console.log('hi!')
    const response = await csrfFetch(`/api/notes/${userId}`);
    console.log(response)
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};


export const getOneNote = id => async dispatch => {
  const response = await csrfFetch(`/api/notes/${id}`);
    console.log(response)
  if (response.ok) {
    const note = await response.json();
    dispatch(addOneNote(note));
  }
};

export const createNote = data => async dispatch => {
  try {
    const response = await csrfFetch(`/api/notes`, {
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

    const note = await response.json();
    dispatch(addOneNote(note));
    return note;
  }
  catch (error) {
    throw error;
  }
};

export const updateNote = data => async dispatch => {
  const response = await csrfFetch(`/api/notes/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const note = await response.json();
    dispatch(addOneNote(note));
    return note;
  }
};
export const deleteNote = id => async dispatch => {
    const response = await csrfFetch(`/api/notes/${id}`, {
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

};

// const sortList = (list) => {
//   return list.sort((pokemonA, pokemonB) => {
//     return pokemonA.number - pokemonB.number;
//   }).map((pokemon) => pokemon.id);
// };

const noteReducer = (state = initialState, action) => {
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
      return { ...state, list: [...state.list, action.note]}

      case DELETE:
        const newState = {...state};
        delete newState[action.noteId]
        return newState;
    default:
      return state;
  }
}

export default noteReducer;
