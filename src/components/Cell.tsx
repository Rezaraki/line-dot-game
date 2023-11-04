/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/control-has-associated-label */
import clsx from 'clsx';
import { ICellObj, TDirections, TUsers } from '../types';
import { useRerender } from '../services';
import { EUsers } from '../common';

function Cell({
  cellObj,
  user,
  updateNeighbourLine,
  changeUser,
}: {
  cellObj: ICellObj;
  user: TUsers;
  updateNeighbourLine: (curCellObj: ICellObj, direction: TDirections, user: TUsers) => void;
  changeUser: () => void;
}) {
  const rerender = useRerender();

  function handleClick(direction: TDirections) {
    const lineIsEmpty = !cellObj.lines[direction];
    if (lineIsEmpty) {
      cellObj.updateLine(direction, user);
      updateNeighbourLine(cellObj, direction, user);
      changeUser();
      rerender();
    }
  }

  const lineClasses = (direction: TDirections) => ({
    [direction]: direction,
    chosen: cellObj.lines[direction],
  });

  return (
    <article
      className={clsx('cell', {
        completed: cellObj.completed,
        hideTop: cellObj.neighbours.top,
        hideLeft: cellObj.neighbours.left,
        user1: cellObj.completedUser === EUsers.First,
        user2: cellObj.completedUser === EUsers.second,
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
