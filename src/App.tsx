import React, { CSSProperties, useMemo, useState } from 'react';
import './assets/styles/app.scss';
import { ICellObj, IDimentions, TDirections, TUsers } from './types';
import CellObj from './services/CellObj';
import Cell from './components/Cell';
import { findNeighbour, updateNeighbourLine, useRerender } from './services';
import { EUsers } from './common';
import Extras from './components/Extras';

const App = () => {
  const rerender = useRerender();
  const [dimentions, setDimentions] = useState({ cols: 5, rows: 5 });
  const [userPlaying, setUserPlaying] = useState<TUsers>(EUsers.First);

  const changeUser = () =>
    setUserPlaying(userPlaying === EUsers.First ? EUsers.second : EUsers.First);

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

  const updateNeighbourLineBinded = (
    curCellObj: ICellObj,
    direction: TDirections,
    user: TUsers,
  ) => {
    const neighbourId = findNeighbour(cellsArr, curCellObj, direction);
    updateNeighbourLine(cellsArr, direction, neighbourId, user, rerender);
  };

  return (
    <main>
      <Extras
        cellsArr={cellsArr}
        userPlaying={userPlaying}
        setDimentions={(dimentions: IDimentions) => setDimentions(dimentions)}
      />
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
