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
    case ACTIONS.SET_LOCKER_FILES:
      return {
        ...state,
        lockerFiles: [...state.lockerFiles, ...action.payload],
      }
    case ACTIONS.CLEAR_PENDING_LOCKER_FILES:
      return {
        ...state,
        lockerFiles: [],
      }
    default:
      return state
  }
}

export default AppReducer
