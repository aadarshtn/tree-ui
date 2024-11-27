import { gql } from "@apollo/client";

const LEFT_TREE_QUERY = gql`
  query GetLeftTree {
    leftTree {
      id
      label
      parentId
    }
  }
`;

const RIGHT_TREE_QUERY = gql`
  query GetRightTree {
    rightTree {
      id
      label
      parentId
    }
  }
`;

export { LEFT_TREE_QUERY, RIGHT_TREE_QUERY };
