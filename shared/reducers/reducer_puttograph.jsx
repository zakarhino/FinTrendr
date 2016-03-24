import { LINEGRAPH_DATA,REMOVE_GRAPH } from '../actions/linegraph';

const INITIAL_STATE = { linegraph: [] };

export default function putToGraph(state = INITIAL_STATE, action) {
  switch(action.type) {
  case LINEGRAPH_DATA:
  console.log('in put linegraph data with', action.payload)
    return { ...state, linegraph: action.payload };
  case REMOVE_GRAPH:
    return {...state, linegraph : action.payload};
  default:
    return state;
  }
}
