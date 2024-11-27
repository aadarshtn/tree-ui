export const generateTreeStructureAndNodePath = (flatArray = []) => {
  console.log({ flatArray });

  const idToNodeMap = {}; // Maps IDs to nodes in the tree structure
  const idToPathMap = {}; // Maps IDs to full paths
  const tree = []; // To store the roots of the tree

  // Create node mapping and initialize paths
  flatArray.forEach((node) => {
    idToNodeMap[node.id] = { ...node, children: [] }; // Tree node
    idToPathMap[node.id] = []; // Placeholder for path
  });

  // Build tree and paths of corresponding nodes
  flatArray.forEach((node) => {
    const currentNode = idToNodeMap[node.id];
    // Attaches the path of the parent and the self label to create full path
    const path = [...(idToPathMap[node.parentId] || []), node.label];
    idToPathMap[node.id] = path;

    if (node.parentId === null) {
      tree.push(currentNode);
    } else {
      // Attach to parent
      const parentNode = idToNodeMap[node.parentId];
      parentNode.children.push(currentNode);
    }
  });

  // Convert paths to label-based mapping
  const pathMap = Object.values(flatArray).reduce((acc, node) => {
    acc[node.label] = idToPathMap[node.id];
    return acc;
  }, {});

  return { tree, pathMap };
};

// generateTreeStructure
// Time Complexity => O(N)
// Space Complexity => O(N) => Since we have created the extra mappings to reduce time complexity.
