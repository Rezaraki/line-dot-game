import { directionsObj } from '../common';
import { ICellObj, TDirections, TUsers } from '../types';

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
    this.lines = { top: false, bottom: false, right: false, left: false };
    this.row = this.getRow(cellIndex, cols, rows);
    this.col = this.getCol(cellIndex, cols);
    this.neighbours = this.getNeighbours(cellIndex, cols, rows);
  }

  getRow(cellIndex: number, cols: number, rows: number): number {
    for (let rowIndex = 1; rowIndex <= rows; rowIndex++) {
      if (cellIndex <= rowIndex * cols) return rowIndex;
    }
    return this.row;
  }

  getCol(cellIndex: number, cols: number): number {
    if (cellIndex > cols) return cellIndex % (cols * (this.row - 1)) || cols;
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

  updateUser(user: number) {
    this.completedUser = user;
  }

  updateCompleted(updateTo = true) {
    this.completed = updateTo;
  }

  updateLine(direction: TDirections, user: TUsers, updateTo = true) {
    if (updateTo && Object.values(this.lines).filter(Boolean).length === 3) {
      this.updateUser(user);
      this.updateCompleted();
    }
    this.lines[direction] = updateTo;
  }
}
export default CellObj;
