import React, { CSSProperties, useMemo, useState } from 'react';
import './assets/styles/app.scss';
import { ICellObj, TDirections } from './types';
import CellObj from './services/CellObj';
import Cell from './components/Cell';
import { findNeighbour, updateNeighbourLine, useRerender } from './services';
import { EDirections } from './common';

const App = () => {
  const rerender = useRerender();
  const cols = 3;
  const rows = 6;
  const totalCells = cols * rows;

  const cellsArr: ICellObj[] = useMemo(
    () => Array.from({ length: totalCells }, (_, index) => new CellObj(index + 1, cols, rows)),
    [],
  );
  const updateNeighbourLineBinded = (curCellObj: ICellObj, direction: TDirections) => {
    const neighbourId = findNeighbour(cellsArr, curCellObj, direction);
    updateNeighbourLine(cellsArr, direction, neighbourId, rerender);
  };

  return (
    <main>
      <div className="game-wrapper">
        <div className="game-container" style={{ '--cols': cols, '--rows': rows } as CSSProperties}>
          {cellsArr.map((cell) => (
            <Cell
              key={cell.id}
              cellObj={cell}
              cols={cols}
              rows={rows}
              updateNeighbourLine={updateNeighbourLineBinded}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default App;
