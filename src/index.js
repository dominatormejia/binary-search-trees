import "./styles.css";
import { Tree, Node } from "./binaryTree";

const test = new Tree();
test.buildTree([1, 1, 4, 1, 2, 2, 6, 8, 9, 2, 2, 3, 3, 3, 4, 5]);
test.insert(100);

test.prettyPrint(test.root);

console.log(test);
