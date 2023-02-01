class Node {
  constructor(name, x, y) {
    this.name = name;
    this.position = { x, y };
    this.visited = false;
    this.neighbors = [];
    this.toVisit = [];
    this.connections = [];
  }

  wasVisited() {
    return this.visited;
  }

    addNeighbor(node) {
        this.neighbors.push(node);
        this.toVisit.push(node);
    }

    removeNeighbor(node) {
        this.toVisit = this.toVisit.filter(el => el != node);
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

        for (let neighbor of this.neighbors) {
            neighbor.removeNeighbor(this);
        }   
    }
}

export default Node;
