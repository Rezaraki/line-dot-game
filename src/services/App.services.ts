import { EDirections, EOpposites } from '../common';
import { ICellObj, TDirections } from '../types';

function findNeighbour(cellsArr: ICellObj[], curCellObj: ICellObj, direction: TDirections) {
  if (direction === EDirections.right && curCellObj.neighbours[direction]) return curCellObj.id + 1;

  if (direction === EDirections.left && curCellObj.neighbours[direction]) return curCellObj.id - 1;

  if (direction === EDirections.left && curCellObj.neighbours[direction]) {
    const neighbourIndex = cellsArr.findIndex(
      (cell) => cell.row === curCellObj.row - 1 && cell.col === curCellObj.col,
    );
    return cellsArr[neighbourIndex].id;
  }

  if (direction === EDirections.bottom && curCellObj.neighbours[direction]) {
    const neighbourIndex = cellsArr.findIndex(
      (cell) => cell.row === curCellObj.row + 1 && cell.col === curCellObj.col,
    );
    return cellsArr[neighbourIndex].id;
  }

  return -1;
}

function updateNeighbourLine(
  cellsArr: ICellObj[],
  chosenDirection: TDirections,
  neighbourId: number,
  rerender?: () => void,
) {
  if (neighbourId > 0) {
    const newDirection = EOpposites[chosenDirection];
    cellsArr[neighbourId - 1].updateLine(newDirection);
    rerender && rerender();
  }
}
export { findNeighbour, updateNeighbourLine };
