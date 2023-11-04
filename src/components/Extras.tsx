import React, { FormEvent, useRef } from 'react';
import { ICellObj, IDimentions, TUsers } from '../types';
import { countScores } from '../services';
import { EUsers } from '../common';

function Extras({
  setDimentions,
  userPlaying,
  cellsArr,
}: {
  setDimentions: (dimentions: IDimentions) => void;
  userPlaying: TUsers;
  cellsArr: ICellObj[];
}) {
  const formRef = useRef<HTMLFormElement>(null);

  function onSubmitHandle(event: FormEvent) {
    event.preventDefault();
    const form = formRef.current;
    if (form) {
      setDimentions({ cols: form.cols.value, rows: form.rows.value });
    }
  }

  return (
    <>
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
    </>
  );
}
export default Extras;
