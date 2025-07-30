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
