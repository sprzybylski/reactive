import { Record, List, fromJS } from 'immutable';

import { INIT, LOADING, SUCCESS, ERROR } from '../../consts/phaseEnums';

import * as api from '../../apis/chatApi';


const FETCH = 'chat/FETCH';
const FETCH_SUCCESS = 'chat/FETCH_SUCCESS';
const FETCH_ERROR = 'chat/FETCH_ERROR';
const RESET = 'chat/RESET';
const ADD_MESSAGE = 'chat/ADD_MESSAGE';

const InitialState = Record({
  name: null,
  messages: List(),
  phase: INIT,
  error: null,
});

export default function chatReducer(state = new InitialState(), action) {
  if (!(state instanceof InitialState)) return new InitialState(fromJS(state));

  switch (action.type) {
    case FETCH:
      return state
        .set('phase', LOADING)
        .set('name', null)
        .set('messages', List())
        .set('error', null);

    case FETCH_SUCCESS:
      return state
        .set('phase', SUCCESS)
        .set('name', action.payload.name)
        .set('messages', List(action.payload.messages));

    case FETCH_ERROR:
      return state
        .set('phase', ERROR)
        .set('error', action.payload.error);

    case RESET:
      return state
          .set('phase', INIT)
          .set('name', null)
          .set('messages', List())
          .set('error', null);

    case ADD_MESSAGE:
      return state
          .set('messages', state.messages.push(action.payload));

    default:
      return state;
  }
}

export const fetchChat = name => async (dispatch) => {
  try {
    dispatch({ type: FETCH });

    const messages = await api.fetchMessages(name);

    dispatch({
      type: FETCH_SUCCESS,
      payload: { name, messages },
    });
  } catch (error) {
    dispatch({
      type: FETCH_ERROR,
      payload: { error },
    });
  }
};

export const addMessage = message => (dispatch) =>  dispatch({ type: ADD_MESSAGE, payload: message});

export const resetChat = () => (dispatch) => dispatch({ type: RESET });
