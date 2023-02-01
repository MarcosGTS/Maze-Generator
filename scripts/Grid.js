import Node from './Node.js';

class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = [];
    this.stack = [];
  }

  initList() {
    this.grid = Array(this.height).fill(0).map(() => new Array(this.width).fill(''));
  }

  isInsideGrid(x, y) {
    if (x < 0 || x >= this.width) return false;
    if (y < 0 || y >= this.height) return false;

    return true;
  }

  getNode(x, y) {
    return this.grid[y][x];
  }

  connectNode(x, y) {
    // Connect neighbor nodes
    const node = this.getNode(x, y);
    const indexes = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    indexes.forEach(([i, j]) => {
      if (this.isInsideGrid(x + i, y + j)) {
        const newNode = this.getNode(x + i, y + j);
        node.addNeighbor(newNode);
      }
    });
  }

  generateGrid() {
    const { width, height } = this;
    this.initList();

    for (let i = 0; i < width; i += 1) {
      for (let j = 0; j < height; j += 1) {
        const name = `${i}, ${j}`;
        this.grid[j][i] = new Node(name, i * 25 + 10, j * 25 + 10);
      }
    }

    for (let i = 0; i < width; i += 1) {
      for (let j = 0; j < height; j += 1) {
        this.connectNode(i, j);
      }
    }

    const initialNode = this.getNode(0, 0);
    this.stack.push(initialNode);
  }

  mazeStep() {
    const node = this.stack[this.stack.length - 1];
    node.visite();
    if (node.toVisit.length > 0) {
      const neighbor = node.getRandomNeighbor();
      this.stack.push(neighbor);
    } else {
      this.stack.pop();
    }

    return this.checkComplition();
  }

  render(context) {
    const { width, height } = this;
    const crrNode = this.stack[this.stack.length - 1];

    for (let i = 0; i < width; i += 1) {
      for (let j = 0; j < height; j += 1) {
        const node = this.getNode(i, j);

        context.lineWidth = 5;
        context.fillStyle = '#000000';

        context.beginPath();
        context.arc(node.position.x, node.position.y, 4, 0, 2 * Math.PI);
        context.fill();
        context.stroke();

        node.drawConnections(context);
      }
    }

    context.lineWidth = 1;
    context.fillStyle = '#00ff00';

    context.beginPath();
    context.arc(crrNode.position.x, crrNode.position.y, 6, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
  }

  checkComplition() {
    return this.stack.length === 0;
  }
}

export default Grid;
