import { SET_LEFT_TREE_PATHS, SET_RIGHT_TREE_PATHS } from "../actionTypes";

export const setLeftTreePaths = (leftTreePaths) => ({
  type: SET_LEFT_TREE_PATHS,
  payload: leftTreePaths,
});

export const setRightTreePaths = (rightTreePaths) => ({
  type: SET_RIGHT_TREE_PATHS,
  payload: rightTreePaths,
});
