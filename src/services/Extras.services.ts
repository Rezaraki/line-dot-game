import { ICellObj } from '../types';

function countScores(cellsArr: ICellObj[], userNumber: number): number {
  return cellsArr.filter((cell) => cell.completedUser === userNumber).length;
}
export { countScores };
