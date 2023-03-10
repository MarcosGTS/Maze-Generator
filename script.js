import Grid from './scripts/Grid.js';
import Player from './scripts/Player.js';

const canvas = document.querySelector('#display');
const context = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

const grid = new Grid(20, 20);
grid.generateGrid();

function finish() {
  const player = new Player(grid, grid.getNode(0, 0));

  document.addEventListener('keydown', (event) => {
    const functions = {
      ArrowRight: () => player.move({ x: 1, y: 0 }),
      ArrowLeft: () => player.move({ x: -1, y: 0 }),
      ArrowDown: () => player.move({ x: 0, y: 1 }),
      ArrowUp: () => player.move({ x: 0, y: -1 }),
    };

    if (functions[event.key]) functions[event.key]();

    context.clearRect(0, 0, canvas.width, canvas.height);
    grid.render(context);
    player.render(context);
  });
}

const loop = setInterval(() => {
  grid.render(context);
  if (grid.mazeStep()) {
    clearInterval(loop);
    finish();
  }
}, 50);

// grid.generateMaze();
// grid.render(context);
