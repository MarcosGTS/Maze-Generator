const canvas = document.querySelector("#display");
const context = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

class Node {
    constructor (name, x, y) {
        this.name = name;
        this.position = {x, y}
        this.visited = false;
        this.neighbors = [];
        this.toVisit = []
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

class Grid {
    constructor (width, height) {
        this.width = width;
        this.height = height;
        this.grid = [];
        this.stack = [];
    }

    initList() {
        this.grid = Array(this.height).fill(0).map(x => new Array(this.width).fill(""));
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

        for (let [i, j] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            if (this.isInsideGrid(x + i, y + j)) {
                const newNode = this.getNode(x + i, y + j);
                node.addNeighbor(newNode);
            }
        }
    }

    generateGrid() {
        const width = this.width;
        const height = this.height;

        this.initList();

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const name = `${i}, ${j}`;
                this.grid[j][i] = new Node(name, i * 25 + 10, j * 25 + 10);
            }
        }

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
               this.connectNode(i, j);
            }
        }

        const initial_node = this.getNode(0, 0);
        this.stack.push(initial_node);
    }

    mazeStep() {
        if (this.checkComplition()) return;
        
        const node = this.stack[this.stack.length - 1];
        node.visite();
            
        if (node.toVisit.length > 0) {
            const neighbor = node.getRandomNeighbor()
            this.stack.push(neighbor);
        } else {
            this.stack.pop();
        }

    }

    render(context) {
        const width = this.width;
        const height = this.height;

        const crrNode = this.stack[this.stack.length - 1];

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const node = this.getNode(i, j);

                context.lineWidth = 5;
                context.fillStyle = "#000000";

                context.beginPath();
                context.arc(node.position.x, node.position.y, 4, 0, 2 * Math.PI);
                context.fill();
                context.stroke();

                this.drawConnections(node, context);
            }
        }

        context.lineWidth = 1;
        context.fillStyle = "#00ff00";

        context.beginPath();
        context.arc(crrNode.position.x, crrNode.position.y, 6, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
    }

    drawConnections(node, context) {
        const originX = node.position.x;
        const originY = node.position.y;
        context.lineWidth = 5;

        for (let neighbor of node.connections) {
            const neighborX = neighbor.position.x;
            const neighborY = neighbor.position.y;
            
            context.beginPath();
            
            context.moveTo(originX, originY);
            context.lineTo(neighborX, neighborY);
            
            context.stroke();
        }
    }

    checkComplition () {
        const width = this.width;
        const height = this.height;

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const node = this.getNode(i, j);
                
                if (!node.wasVisited()) return false;
            }
        }

        return true;
    }
}

const grid = new Grid(20, 20);
grid.generateGrid();

setInterval(() => {
    grid.mazeStep();
    grid.render(context);
}, 100);
