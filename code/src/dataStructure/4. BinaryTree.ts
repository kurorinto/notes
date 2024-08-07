interface BinaryTree<T = any> {
  data: T;
  left?: BinaryTree;
  right?: BinaryTree;
}

const numberTree: BinaryTree<number> = {
  data: 1,
  left: {
    data: 2,
    left: {
      data: 4,
      right: {
        data: 8,
      },
    },
    right: {
      data: 5,
      left: {
        data: 9,
      },
    },
  },
  right: {
    data: 3,
    left: {
      data: 6,
      left: {
        data: 10,
      },
      right: {
        data: 11,
      },
    },
    right: {
      data: 7,
      left: {
        data: 12,
      },
      right: {
        data: 13,
      },
    },
  },
};

// 递归版DFS 的 先序、中序、后序遍历
const binaryTreeRecursiveDFS = <T>(
  tree: BinaryTree<T>,
  order: "pre-order" | "in-order" | "post-order" = "in-order",
  cb?: (data: T) => void,
) => {
  if (tree) {
    if (order === "pre-order") {
      cb?.(tree.data);
    }
    binaryTreeRecursiveDFS(tree.left, order, cb);
    if (order === "in-order") {
      cb?.(tree.data);
    }
    binaryTreeRecursiveDFS(tree.right, order, cb);
    if (order === "post-order") {
      cb?.(tree.data);
    }
  }
};

// 迭代版DFS 先序和中序
const binaryTreeIterativeDFS = <T>(
  tree: BinaryTree<T>,
  order: "pre-order" | "in-order" = "in-order",
  cb?: (data: T) => void,
) => {
  let currentTree = tree;
  const stack: BinaryTree<T>[] = [];
  while (stack.length || currentTree) {
    while (currentTree) {
      if (order === "pre-order") {
        cb?.(currentTree.data);
      }
      stack.push(currentTree);
      currentTree = currentTree.left;
    }
    if (stack.length) {
      currentTree = stack.pop();
      if (order === "in-order") {
        cb?.(currentTree.data);
      }
      currentTree = currentTree.right;
    }
  }
};

// 迭代版DFS 后序
const binaryTreeIterativePostOrderDFS = <T>(tree: BinaryTree<T>, cb?: (data: T) => void) => {
  let currentTree = tree;
  let visitedTree: BinaryTree<T> | null = null;
  const stack: BinaryTree<T>[] = [];
  while (stack.length || currentTree) {
    while (currentTree) {
      stack.push(currentTree);
      currentTree = currentTree.left;
    }
    const tempTree = stack[stack.length - 1];
    // 如果右子树不存在 或 已经被访问过
    if (tempTree.right && visitedTree !== tempTree.right) {
      currentTree = tempTree.right;
    } else {
      cb?.(tempTree.data);
      visitedTree = stack.pop();
    }
  }
};

// BFS 层序遍历
const binaryTreeBFS = <T>(tree: BinaryTree<T>, cb?: (data: T) => void) => {
  const queue: BinaryTree<T>[] = [tree];
  while (queue.length) {
    const current = queue.shift();
    cb?.(current.data);
    current.left && queue.push(current.left);
    current.right && queue.push(current.right);
  }
};

// binaryTreeRecursiveDFS(numberTree, "post-order", (item) => {
//   console.log(item);
// });

// binaryTreeBFS(numberTree, (item) => {
//   console.log(item);
// });

// binaryTreeIterativeDFS(numberTree, "pre-order", (item) => {
//   console.log(item);
// });

binaryTreeIterativePostOrderDFS(numberTree, (item) => {
  console.log(item);
});
