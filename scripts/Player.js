class Player {
  constructor(grid, initialNode) {
    this.grid = grid;
    this.crrNode = initialNode;
  }

  isValidMove(targetNode) {
    return this.crrNode.getConnections().includes(targetNode);
  }

  getTargetNode(dirX, dirY) {
    const { x, y } = this.crrNode.index;
    const newNode = this.grid.getNode(x + dirX, y + dirY);

    if (this.isValidMove(newNode)) return newNode;
    return this.crrNode;
  }

  move(direction) {
    const targetNode = this.getTargetNode(direction.x, direction.y);
    this.crrNode = targetNode;
  }

  render(context) {
    const { x, y } = this.crrNode.position;

    context.fillStyle = '#ff0000';
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI);
    context.fill();
  }
}

export default Player;
