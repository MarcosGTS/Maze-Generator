class Player {
  constructor(grid, initialNode) {
    this.grid = grid;
    this.crrNode = initialNode;
    this.lastNode = null;
  }

  isValidMove(targetNode) {
    if (targetNode === this.lastNode) return true;
    return this.crrNode.getConnections().includes(targetNode);
  }

  getTargetNode(dirX, dirY) {
    const { x, y } = this.crrNode.index;

    console.log(x, y, dirX, dirY);
    return this.grid.getNode(x + dirX, y + dirY);
  }

  move(direction) {
    const targetNode = this.getTargetNode(direction.x, direction.y);

    if (this.isValidMove(targetNode)) {
      this.lastNode = this.crrNode;
      this.crrNode = targetNode;
    }
  }

  render(context) {
    const { x, y } = this.crrNode.position;
    context.fillStyle = '#ff0000';
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
  }
}

export default Player;
