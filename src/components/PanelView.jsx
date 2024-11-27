import { React, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { useDispatch, useSelector } from "react-redux";
import { setLeftTree, setRightTree } from "../redux/actions/treeAction"; // Action creators
import {
  setLeftTreePaths,
  setRightTreePaths,
} from "../redux/actions/nodePathAction"; // Action creators

import TreeNode from "./TreeNode";
import { generateTreeStructureAndNodePath } from "../utils/generateTree";
import { LEFT_TREE_QUERY, RIGHT_TREE_QUERY } from "../apollo/queries";

const PanelView = () => {
  const dispatch = useDispatch();

  // Fetching the data from GQL server
  const { loading: loadingLeftTree, data: leftData } =
    useQuery(LEFT_TREE_QUERY);
  const { loading: loadingRightTree, data: rightData } =
    useQuery(RIGHT_TREE_QUERY);

  useEffect(() => {
    console.log(leftData);

    if (leftData) {
      const { tree: leftTreeData, pathMap: leftPathMapData } =
        generateTreeStructureAndNodePath(leftData?.leftTree ?? []);
      dispatch(setLeftTree(leftTreeData));
      dispatch(setLeftTreePaths(leftPathMapData));
    }
    if (rightData) {
      const { tree: rightTreeData, pathMap: rightPathMapData } =
        generateTreeStructureAndNodePath(rightData?.rightTree ?? []);

      dispatch(setRightTree(rightTreeData));
      dispatch(setRightTreePaths(rightPathMapData));
    }
  }, [leftData, rightData, dispatch]);

  // Data from Redux State
  const { leftTree, rightTree } = useSelector((state) => state.tree);
  const { leftTreePaths: leftPathMap, rightTreePaths: rightPathMap } =
    useSelector((state) => state.nodePath);

  const [selectedNodeLeft, setSelectedNodeLeft] = useState(null);
  const [selectedNodeRight, setSelectedNodeRight] = useState(null);
  const [pathInOtherTree, setPathInOtherTree] = useState(null);

  const handleLeftNodeSelection = (val) => {
    setPathInOtherTree(null);
    setSelectedNodeRight(null);
    setSelectedNodeLeft(val);
  };

  const handleRightNodeSelection = (val) => {
    setPathInOtherTree(null);
    setSelectedNodeLeft(null);
    setSelectedNodeRight(val);
  };

  const findPathInOtherTree = () => {
    let path;
    if (selectedNodeLeft) {
      // Find path from the left tree in the right tree
      const label = selectedNodeLeft?.label;
      path = rightPathMap[label];
    } else if (selectedNodeRight) {
      // Find path from the right tree in the left tree
      const label = selectedNodeRight?.label;
      path = leftPathMap[label];
    }

    if (!path) {
      setPathInOtherTree("Node not found in the other tree");
    } else {
      setPathInOtherTree(path.join(" → "));
    }
  };

  if (loadingLeftTree || loadingRightTree) return <div>Loading...</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        padding: 20,
      }}
    >
      <div style={{ display: "flex", width: "90%" }}>
        {/* Left Tree Panel */}
        <div style={{ flex: 1, border: "1px solid #ccc", padding: 10 }}>
          <h3>Left Tree</h3>
          {leftTree.map((node) => {
            return (
              <TreeNode
                key={node.id}
                node={node}
                onNodeSelect={handleLeftNodeSelection}
                selectedNode={selectedNodeLeft}
              />
            );
          })}
        </div>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Actions</h3>
          <button
            onClick={findPathInOtherTree}
            disabled={!selectedNodeLeft && !selectedNodeRight}
          >
            Find Path in Other Tree
          </button>
          {(selectedNodeLeft || selectedNodeRight) && (
            <p>
              Selected Node:{" "}
              {selectedNodeLeft?.label ?? selectedNodeRight?.label}
            </p>
          )}
          {pathInOtherTree && (
            <div
              style={{ marginTop: 10, padding: 10, border: "1px solid #000" }}
            >
              <h4>Path in other Tree:</h4>
              <p>{pathInOtherTree}</p>
            </div>
          )}
        </div>

        {/* Right Tree Panel */}
        <div style={{ flex: 1, border: "1px solid #ccc", padding: 10 }}>
          <h3>Right Tree</h3>
          {rightTree.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              onNodeSelect={handleRightNodeSelection}
              selectedNode={selectedNodeRight}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PanelView;
