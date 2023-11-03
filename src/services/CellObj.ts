import { directionsObj } from '../common';
import { ICellObj, TDirections } from '../types';

class CellObj implements ICellObj {
  id: number;

  completedUser: number | null;

  completed: boolean;

  neighbours: Record<TDirections, boolean>;

  lines: Record<TDirections, boolean>;

  row: number;

  col: number;

  constructor(cellIndex: number, cols: number, rows: number) {
    this.id = cellIndex;
    this.completedUser = null;
    this.completed = false;
    this.neighbours = this.getNeighbours(cellIndex, cols, rows);
    this.lines = { top: false, bottom: false, right: false, left: false };
    this.row = this.getRow(cellIndex, cols, rows);
    this.col = this.getCol(cellIndex, cols);
  }

  getRow(cellIndex: number, cols: number, rows: number): number {
    for (let rowIndex = 1; rowIndex <= rows; rowIndex++) {
      if (cellIndex <= rowIndex * cols) return rowIndex;
    }
    return this.row;
  }

  getCol(cellIndex: number, cols: number): number {
    if (cellIndex > cols) return cellIndex % (cols * this.row);
    return cellIndex;
  }

  getNeighbours(cellIndex: number, cols: number, rows: number) {
    const neighbours = directionsObj(true);

    if (this.row === 1) {
      neighbours.top = false;
    }
    if (this.row === rows) {
      neighbours.bottom = false;
    }

    if (cellIndex === 1 || cellIndex % cols === 1) {
      neighbours.left = false;
    }
    if (cellIndex === this.row * cols) {
      neighbours.right = false;
    }
    return neighbours;
  }

  updateLine(direction: TDirections, updateTo = true) {
    this.lines[direction] = updateTo;
  }
}
export default CellObj;
