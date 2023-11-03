import React, { CSSProperties } from 'react';
import './assets/styles/app.scss';
import { ICellObj } from './types';
import CellObj from './services/CellObj';
import Cell from './components/Cell';

const App = () => {
  const cols = 3;
  const rows = 6;
  const totalCells = cols * rows;
  const cellsArr: ICellObj[] = Array.from(
    { length: totalCells },
    (_, index) => new CellObj(index, cols, rows),
  );

  return (
    <main>
      <div className="game-container" style={{ '--cols': cols, '--rows': rows } as CSSProperties}>
        {cellsArr.map((cell) => (
          <Cell CellObj={cell} />
        ))}
      </div>
    </main>
  );
};

export default App;
