import { combineReducers } from "redux";
import treeReducer from "./treeReducer";
import nodePathReducer from "./nodePathReducer";

const rootReducer = combineReducers({
  tree: treeReducer,
  nodePath: nodePathReducer,
});

export default rootReducer;
