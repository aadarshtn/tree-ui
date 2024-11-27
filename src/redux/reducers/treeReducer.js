import { SET_LEFT_TREE, SET_RIGHT_TREE } from "../actionTypes";

const initialState = {
  leftTree: [],
  rightTree: [],
};

const treeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEFT_TREE:
      return {
        ...state,
        leftTree: action.payload,
      };
    case SET_RIGHT_TREE:
      return {
        ...state,
        rightTree: action.payload,
      };
    default:
      return state;
  }
};

export default treeReducer;
