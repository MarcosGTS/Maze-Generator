class Node {
  constructor(index, x, y) {
    this.index = index;
    this.position = { x, y };
    this.visited = false;
    this.neighbors = [];
    this.toVisit = [];
    this.connections = [];
  }

  wasVisited() {
    return this.visited;
  }

  getConnections() {
    return this.connections;
  }

  addNeighbor(node) {
    this.neighbors.push(node);
    this.toVisit.push(node);
  }

  removeNeighbor(node) {
    this.toVisit = this.toVisit.filter((el) => el !== node);
  }

  getRandomNeighbor() {
    const randomIndex = Math.floor(Math.random() * this.toVisit.length);
    const randomNeighbor = this.toVisit[randomIndex];
    this.connections.push(randomNeighbor);
    this.removeNeighbor(randomNeighbor);
    randomNeighbor.removeNeighbor(this);

    return randomNeighbor;
  }

  visite() {
    this.visited = true;
    this.neighbors.forEach((neighbor) => {
      neighbor.removeNeighbor(this);
    });
  }

  drawConnections(context) {
    const originX = this.position.x;
    const originY = this.position.y;
    context.lineWidth = 5;

    this.connections.forEach((neighbor) => {
      const neighborX = neighbor.position.x;
      const neighborY = neighbor.position.y;
      context.beginPath();
      context.moveTo(originX, originY);
      context.lineTo(neighborX, neighborY);
      context.stroke();
    });
  }
}

export default Node;
