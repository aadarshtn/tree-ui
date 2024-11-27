import { React, useState } from "react";

const TreeNode = ({ node, onNodeSelect, selectedNode }) => {
  const [expanded, setExpanded] = useState(false);

  const isSelected = selectedNode?.id === node.id; // Check if the node is selected

  return (
    <div style={{ marginLeft: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {node.children.length ? (
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? "-" : "+"}
          </button>
        ) : null}
        <span
          onClick={() => onNodeSelect(node)}
          style={{
            cursor: "pointer",
            marginLeft: 8,
            backgroundColor: isSelected ? "#e0e0e0" : "transparent",
            padding: "5px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {node.label}
        </span>
      </div>
      {expanded && (
        <div style={{ marginLeft: 20 }}>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onNodeSelect={onNodeSelect}
              selectedNode={selectedNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
