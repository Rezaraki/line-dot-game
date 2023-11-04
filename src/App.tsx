import React, { CSSProperties, FormEvent, useMemo, useRef, useState } from 'react';
import './assets/styles/app.scss';
import { ICellObj, TDirections } from './types';
import CellObj from './services/CellObj';
import Cell from './components/Cell';
import { findNeighbour, updateNeighbourLine, useRerender } from './services';

const App = () => {
  const rerender = useRerender();
  const [dimentions, setDimentions] = useState({ cols: 5, rows: 5 });

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

  const updateNeighbourLineBinded = (curCellObj: ICellObj, direction: TDirections) => {
    const neighbourId = findNeighbour(cellsArr, curCellObj, direction);
    updateNeighbourLine(cellsArr, direction, neighbourId, rerender);
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
      <div className="wrapper">
        <div
          className="game-container"
          style={{ '--cols': dimentions.cols, '--rows': dimentions.rows } as CSSProperties}
        >
          {cellsArr.map((cell) => (
            <Cell
              key={cell.id}
              cellObj={cell}
              cols={dimentions.cols}
              rows={dimentions.rows}
              updateNeighbourLine={updateNeighbourLineBinded}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default App;
