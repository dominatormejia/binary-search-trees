import { MergeSort } from "./mergeSort";

export class Node {
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
  buildTree(array, start, end) {
    if (start === undefined || end === undefined) {
      array = this.removeDuplicatesAndSort(array);
      start = 0;
      end = array.length - 1;
    }

    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);

    let root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    if (arguments.length === 1) {
      this.root = root;
    }

    return root;
  }

  removeDuplicatesAndSort(array) {
    array = [...new Set(array)];
    const mergeSort = new MergeSort();
    array = mergeSort.sort(array);
    return array;
  }

  insert(data) {
    this.root = this.insertNode(this.root, data);
  }

  insertNode(node, data) {
    if (node === null) return new Node(data);
    if (node.data === data) return node;

    if (data < node.data) {
      node.left = this.insertNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.insertNode(node.right, data);
    }
    return node;
  }
  deleteItem(data, root = this.root) {
    if (root === null) {
      return root;
    }

    if (root.data > data) {
      root.left = this.deleteItem(data, root.left);
    } else if (root.data < data) {
      root.right = this.deleteItem(data, root.right);
    } else {
      if (root.left === null) {
        return root.right;
      }

      if (root.right === null) {
        return root.left;
      }

      let newNode = this.findSuccessor(root);
      root.data = newNode.data;
      root.right = this.deleteItem(newNode.data, root.right);
    }
    return root;
  }

  findSuccessor(root) {
    root = root.right;

    while (root !== null && root.left !== null) {
      root = root.left;
    }

    return root;
  }

  findValue(data, root = this.root) {
    if (root === null) return "Not in Tree";

    if (root.data === data) return root;

    if (data < root.data) {
      return this.findValue(data, root.left);
    } else {
      return this.findValue(data, root.right);
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function")
      throw Error("Argument must be a function");

    if (this.root === null) return [];

    let queue = [this.root];

    while (queue.length > 0) {
      let current = queue.shift();

      callback(current.data);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }
  inOrderForEach(callback) {
    if (typeof callback !== "function")
      throw Error("Argument must be a function");

    function traverse(node) {
      if (node !== null) {
        traverse(node.left);
        callback(node.data);
        traverse(node.right);
      }
    }
    traverse(this.root);
  }
  preOrderForEach(callback) {
    if (typeof callback !== "function")
      throw Error("Argument must be a function");

    function traverse(node) {
      if (node !== null) {
        callback(node.data);
        traverse(node.left);
        traverse(node.right);
      }
    }
    traverse(this.root);
  }
  postOrderForEach(callback) {
    if (typeof callback !== "function")
      throw Error("Argument must be a function");

    function traverse(node) {
      if (node !== null) {
        traverse(node.left);
        traverse(node.right);
        callback(node.data);
      }
    }
    traverse(this.root);
  }
  height(data) {
    const node = this.findValue(data);
    if (!node) return null;

    function getHeight(node) {
      if (node === null) return -1;
      return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }

    return getHeight(node);
  }

  depth(data, root = this.root, depth = 0) {
    if (root === null) return null;

    if (root.data === data) return depth;

    if (data < root.data) {
      return this.depth(data, root.left, depth + 1);
    } else {
      return this.depth(data, root.right, depth + 1);
    }
  }

  isBalanced(root = this.root) {
    function check(node) {
      if (!node) return 0;

      const leftHeight = check(node.left);
      const rightHeight = check(node.right);

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
    const result = [];
    this.postOrderForEach((data) => {
      result.push(data);
    });
    this.root = this.buildTree(result);
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
