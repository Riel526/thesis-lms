import * as ACTIONS from './AppActions'

const AppReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_MODAL_ATTRIBUTES:
      return {
        ...state,
        modalAttributes: {
          ...state.modalAttributes,
          ...action.payload,
        },
      }
    case ACTIONS.SET_MODULE_FILE:
      return {
        ...state,
        moduleFile: action.payload,
      }
    default:
      return state
  }
}

export default AppReducer
