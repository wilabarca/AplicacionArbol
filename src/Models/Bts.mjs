import { TreeNode } from './TreeNode.mjs';

export class Bst {
    constructor() {
        this.root = null;
    }

    insert(product, callback) {
        const newNode = new TreeNode(product.id, product); 
        if (this.root === null) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
        if (callback) callback();
    }

    _insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    search(id, callback) {
        const result = this._searchNode(this.root, id);
        if (callback) callback(result);
    }

    _searchNode(node, id) {
        if (node === null || node.value === null) {
            return null;
        }
        if (id < node.key) {
            return this._searchNode(node.left, id);
        } else if (id > node.key) {
            return this._searchNode(node.right, id);
        } else {
            return node.value;
        }
    }

    getMin(callback) {
        const result = this._getMinNode(this.root);
        if (callback) callback(result);
    }

    _getMinNode(node) {
        if (node === null) {
            return null;
        }
        let currentNode = node;
        while (currentNode.left !== null) {
            currentNode = currentNode.left;
        }
        let minPriceNode = currentNode.value;

        // Recorremos el árbol para encontrar el nodo con el precio mínimo
        this._inOrderTraverseNode(node, (currentNode) => {
            if (currentNode.price < minPriceNode.price) {
                minPriceNode = currentNode;
            }
        });

        return minPriceNode;
    }

    getMax(callback) {
        const result = this._getMaxNode(this.root);
        if (callback) callback(result);
    }

    _getMaxNode(node) {
        if (node === null) {
            return null;
        }
        let currentNode = node;
        while (currentNode.right !== null) {
            currentNode = currentNode.right;
        }
        let maxPriceNode = currentNode.value;

        // Recorremos el árbol para encontrar el nodo con el precio máximo
        this._inOrderTraverseNode(node, (currentNode) => {
            if (currentNode.price > maxPriceNode.price) {
                maxPriceNode = currentNode;
            }
        });

        return maxPriceNode;
    }

    traverse(callback) {
        const products = [];
        this._inOrderTraverseNode(this.root, (product) => {
            products.push(product);
        });
        if (callback) callback(products);
    }

    _inOrderTraverseNode(node, callback) {
        if (node !== null) {
            this._inOrderTraverseNode(node.left, callback);
            callback(node.value);
            this._inOrderTraverseNode(node.right, callback);
        }
    }
}
