import React, { CSSProperties, FormEvent, useMemo, useRef, useState } from 'react';
import './assets/styles/app.scss';
import { ICellObj, TDirections, TUsers } from './types';
import CellObj from './services/CellObj';
import Cell from './components/Cell';
import { countScores, findNeighbour, updateNeighbourLine, useRerender } from './services';
import { EUsers } from './common';

const App = () => {
  const rerender = useRerender();
  const [dimentions, setDimentions] = useState({ cols: 5, rows: 5 });
  const [userPlaying, setUserPlaying] = useState<TUsers>(EUsers.First);

  const changeUser = () =>
    setUserPlaying(userPlaying === EUsers.First ? EUsers.second : EUsers.First);
  const formRef = useRef<HTMLFormElement>(null);

  const totalCells = dimentions.cols * dimentions.rows;

  // not the best solution
  const cellsArr: ICellObj[] = useMemo(
    () =>
      Array.from(
        { length: totalCells },
        (_, index) => new CellObj(index + 1, dimentions.cols, dimentions.rows),
      ),
    [dimentions],
  );
  const user1Score = 0;
  const user2Score = 1;
  const updateNeighbourLineBinded = (
    curCellObj: ICellObj,
    direction: TDirections,
    user: TUsers,
  ) => {
    const neighbourId = findNeighbour(cellsArr, curCellObj, direction);
    updateNeighbourLine(cellsArr, direction, neighbourId, user, rerender);
  };

  function onSubmitHandle(event: FormEvent) {
    event.preventDefault();
    const form = formRef.current;
    if (form) {
      console.log(`Columns: ${form.cols.value}, Rows: ${form.rows.value}`);
      setDimentions({ cols: form.cols.value, rows: form.rows.value });
    }
  }

  return (
    <main>
      <div className="wrapper">
        <form onSubmit={onSubmitHandle} ref={formRef}>
          <label htmlFor="cols">Columns:</label>
          <input type="number" name="cols" id="cols" />

          <label htmlFor="rows">Rows:</label>
          <input type="number" name="rows" id="rows" />
          <button>change board size </button>
        </form>
      </div>
      <div className="wrapper">it's user{userPlaying}'s turn.</div>
      <div className="wrapper">
        <div className="user1">user1: {countScores(cellsArr, EUsers.First)}</div>
        <div className="user2">user2: {countScores(cellsArr, EUsers.second)}</div>
      </div>
      <div className="wrapper">
        <div
          className="game-container"
          style={{ '--cols': dimentions.cols, '--rows': dimentions.rows } as CSSProperties}
        >
          {cellsArr.map((cell) => (
            <Cell
              key={cell.id}
              cellObj={cell}
              updateNeighbourLine={updateNeighbourLineBinded}
              changeUser={changeUser}
              user={userPlaying}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default App;
