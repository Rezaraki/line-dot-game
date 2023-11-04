/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/control-has-associated-label */
import clsx from 'clsx';
import { ICellObj, TDirections } from '../types';
import { useRerender } from '../services';

function Cell({
  cellObj,
  rows,
  cols,
  updateNeighbourLine,
}: {
  cellObj: ICellObj;
  rows: number;
  cols: number;
  updateNeighbourLine: (curCellObj: ICellObj, direction: TDirections) => void;
}) {
  const rerender = useRerender();

  function handleClick(direction: TDirections) {
    console.log(direction, cellObj.id, cellObj.lines);

    cellObj.updateLine(direction);
    updateNeighbourLine(cellObj, direction);

    rerender();
    console.log(direction, cellObj.id, cellObj.lines);
  }

  const lineClasses = (direction: TDirections) => ({
    [direction]: direction,
    chosen: cellObj.lines[direction],
    user1: cellObj.completedUser === 1,
    user2: cellObj.completedUser === 2,
  });

  return (
    <article
      className={clsx('cell', {
        completed: cellObj.completed,
        hideTop: cellObj.neighbours.top,
        hideLeft: cellObj.neighbours.left,
      })}
    >
      <button
        onClickCapture={() => handleClick('top')}
        className={clsx('block', lineClasses('top'))}
      />
      <button
        onClickCapture={() => handleClick('bottom')}
        className={clsx('block', lineClasses('bottom'))}
      />
      <button
        onClickCapture={() => handleClick('right')}
        className={clsx('inline', lineClasses('right'))}
      />
      <button
        onClickCapture={() => handleClick('left')}
        className={clsx('inline', lineClasses('left'))}
      />
    </article>
  );
}

export default Cell;
