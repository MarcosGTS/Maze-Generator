import Grid from './scripts/Grid.js';

const canvas = document.querySelector('#display');
const context = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

const grid = new Grid(20, 20);
grid.generateGrid();

setInterval(() => {
  grid.mazeStep();
  grid.render(context);
}, 100);
