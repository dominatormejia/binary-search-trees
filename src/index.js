import "./styles.css";
import { Tree } from "./binaryTree";

const driverScript = function (max = 16) {
  const array = [];
  for (let i = 0; i < max; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
};
const binaryTree = new Tree();
binaryTree.buildTree(driverScript(16));
console.log(binaryTree.isBalanced());

const levelOrder = [];
binaryTree.levelOrderForEach((data) => {
  levelOrder.push(data);
});
console.log(`Level-Order: ${levelOrder}`);

const preOrder = [];
binaryTree.preOrderForEach((data) => {
  preOrder.push(data);
});
console.log(`Pre-Order: ${preOrder}`);

const inOrder = [];
binaryTree.inOrderForEach((data) => {
  inOrder.push(data);
});
console.log(`In-Order: ${inOrder}`);

const postOrder = [];
binaryTree.postOrderForEach((data) => {
  postOrder.push(data);
});
console.log(`Post-Order: ${postOrder}`);
binaryTree.prettyPrint(binaryTree.root);

binaryTree.insert(500);
binaryTree.insert(400);
console.log(binaryTree.isBalanced());
binaryTree.rebalance();
binaryTree.prettyPrint(binaryTree.root);
console.log(binaryTree.isBalanced());

const levelOrder2 = [];
binaryTree.levelOrderForEach((data) => {
  levelOrder2.push(data);
});
console.log(`Level-Order: ${levelOrder2}`);

const preOrder2 = [];
binaryTree.preOrderForEach((data) => {
  preOrder2.push(data);
});
console.log(`Pre-Order: ${preOrder2}`);

const inOrder2 = [];
binaryTree.inOrderForEach((data) => {
  inOrder2.push(data);
});
console.log(`In-Order: ${inOrder2}`);

const postOrder2 = [];
binaryTree.postOrderForEach((data) => {
  postOrder2.push(data);
});
console.log(`Post-Order: ${postOrder2}`);
binaryTree.prettyPrint(binaryTree.root);
