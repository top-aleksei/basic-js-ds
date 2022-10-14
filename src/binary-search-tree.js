const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(data) {
    let newNode = new Node(data);
    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      addNode(this.rootNode, newNode);
    }

    function addNode(node, newNode) {
      if (newNode.data > node.data) {
        if (node.right === null) {
          node.right = newNode;
        } else {
          addNode(node.right, newNode);
        }
      } else {
        if (node.left === null) {
          node.left = newNode;
        } else {
          addNode(node.left, newNode);
        }
      }
    }
  }

  has(data) {
    function findNode(node, data) {
      if (!node) {
        return false;
      }
      if (node.data === data) {
        return true;
      }
      if (data < node.data) {
        return findNode(node.left, data);
      } else {
        return findNode(node.right, data);
      }
    }
    return findNode(this.rootNode, data);
  }

  find(data) {
    function returnNode(node, data) {
      if (!node) {
        return null;
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        return returnNode(node.left, data);
      } else {
        return returnNode(node.right, data);
      }
    }
    return returnNode(this.rootNode, data);
  }

  remove(data) {
    function minNode(node) {
      if (node.left === null) return node;
      else return minNode(node.left);
    }
    this.rootNode = remooveNode(this.rootNode, data);

    function remooveNode(node, data) {
      if (!node) {
        return null;
      } else if (data < node.data) {
        node.left = remooveNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = remooveNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          node = null;
          return node;
        }

        if (!node.left) {
          node = node.right;
          return node;
        } else if (!node.right) {
          node = node.left;
          return node;
        }

        let copyNode = minNode(node.right);
        node.data = copyNode.data;
        node.right = remooveNode(node.right, copyNode.data);
        return node;
      }
    }
  }

  min() {
    let minNode = this.rootNode;
    while (minNode.left) {
      minNode = minNode.left;
    }
    return minNode.data;
  }

  max() {
    let maxNode = this.rootNode;
    while (maxNode.right) {
      maxNode = maxNode.right;
    }
    return maxNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
