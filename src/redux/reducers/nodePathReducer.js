import { SET_LEFT_TREE_PATHS, SET_RIGHT_TREE_PATHS } from "../actionTypes";

const initialState = {
  leftTreePaths: {},
  rightTreePaths: {},
};

const nodePathReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEFT_TREE_PATHS:
      return {
        ...state,
        leftTreePaths: action.payload,
      };
    case SET_RIGHT_TREE_PATHS:
      return {
        ...state,
        rightTreePaths: action.payload,
      };
    default:
      return state;
  }
};

export default nodePathReducer;
