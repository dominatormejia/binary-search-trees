import { MergeSort } from "./mergeSort";

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor() {
    this.root = null;
  }

  buildTree(array) {
    array = [...new Set(array)];
    const mergeSort = new MergeSort();
    array = mergeSort.sort(array);

    return (this.root = this.buildTreeHelper(array));
  }

  buildTreeHelper(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);

    root.left = this.buildTreeHelper(array, start, mid - 1);
    root.right = this.buildTreeHelper(array, mid + 1, end);

    return root;
  }
  insert(data, root = this.root) {
    if (root === null) return new Node(data);

    if (root.data === data) return root;

    if (data > root.data) {
      root.right = this.insert(data, root.right);
    } else {
      root.left = this.insert(data, root.left);
    }
    return root;
  }

  deleteItem(data, root = this.root) {
    if (root === null) return root;

    if (data > root.data) {
      root.right = this.deleteItem(data, root.right);
    } else if (data < root.data) {
      root.left = this.deleteItem(data, root.left);
    } else {
      if (root.left === null) return root.right;

      if (root.right === null) return root.left;

      let success = this.successor(root);
      root.data = success.data;
      root.right = this.deleteItem(success.data, root.right);
    }
    return root;
  }

  successor(current) {
    current = current.right;

    while (current !== null && current.left !== null) {
      current = current.left;
    }

    return current;
  }

  find(data, root = this.root) {
    if (root.data === data) return root;

    if (data > root.data) {
      return (root.right = this.find(data, root.right));
    } else {
      return (root.left = this.find(data, root.left));
    }
  }
  levelOrderForEach(callback, root = this.root) {
    if (typeof callback !== "function")
      throw Error("Callback must be a function");
    if (!root) return;
    const queue = [root];

    while (queue.length > 0) {
      let current = queue.shift();

      callback(current.data);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }
  preOrderForEach(callback, root = this.root) {
    if (typeof callback !== "function")
      throw Error("Callback must be a function");
    if (!root) return;

    callback(root.data);
    this.preOrderForEach(callback, root.left);
    this.preOrderForEach(callback, root.right);
  }

  inOrderForEach(callback, root = this.root) {
    if (typeof callback !== "function")
      throw Error("Callback must be a function");
    if (!root) return;

    this.inOrderForEach(callback, root.left);
    callback(root.data);
    this.inOrderForEach(callback, root.right);
  }

  postOrderForEach(callback, root = this.root) {
    if (typeof callback !== "function")
      throw Error("Callback must be a function");
    if (!root) return;

    this.postOrderForEach(callback, root.left);
    this.postOrderForEach(callback, root.right);
    callback(root.data);
  }
  height(data, root = this.root) {
    const node = this.find(data, root);
    return this.computeHeight(node);
  }

  computeHeight(node) {
    if (!node) return -1;

    return (
      1 +
      Math.max(this.computeHeight(node.left), this.computeHeight(node.right))
    );
  }

  depth(data, root = this.root) {
    return this.computeDepth(data, root);
  }

  computeDepth(node, root, depth = 0) {
    if (!root) return -1;

    if (node === root.data) return depth;

    if (node > root.data) {
      return this.computeDepth(node, root.right, depth + 1);
    } else {
      return this.computeDepth(node, root.left, depth + 1);
    }
  }

  isBalanced(root = this.root) {
    function check(root) {
      if (!root) return 0;

      const leftHeight = check(root.left);
      const rightHeight = check(root.right);

      if (
        leftHeight === -1 ||
        rightHeight === -1 ||
        Math.abs(leftHeight - rightHeight) > 1
      ) {
        return -1;
      }

      return Math.max(leftHeight, rightHeight) + 1;
    }
    return check(root) !== -1;
  }

  rebalance() {
    const levelOrder = [];
    this.levelOrderForEach((data) => {
      levelOrder.push(data);
    });

    this.root = this.buildTree(levelOrder);
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
