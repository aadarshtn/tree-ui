import { SET_LEFT_TREE, SET_RIGHT_TREE } from "../actionTypes";

// Action creators
export const setLeftTree = (leftTree) => ({
  type: SET_LEFT_TREE,
  payload: leftTree,
});

export const setRightTree = (rightTree) => ({
  type: SET_RIGHT_TREE,
  payload: rightTree,
});
