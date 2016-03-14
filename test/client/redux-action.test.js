import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {GET_KEYWORD,getkeyword} from '../../shared/actions/keyword'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: types.ADD_TODO,
      text
    }
    expect(getkeyword(text))
      .toEqual(expectedAction)
  })
})
