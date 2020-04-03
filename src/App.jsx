import React, { useState, useEffect, useCallback } from "react";
import { SetGameParams } from "./components/SetGameParams";
import { Field } from "./components/Field";
import { FakeField } from "./components/FakeField";

import { useGame } from "./hooks/gameHook";
import { GameStatus } from "./components/GameStatus";

const defaultParams = {
  width: 10,
  height: 10,
  bombs: 10
};

export const App = () => {
  const [params, setParams] = useState(defaultParams);

  const {
    rows,
    getRows,
    openCell,
    setFlag,
    time,
    isStart,
    bombs,
    disableParams,
    setIsStart
  } = useGame(params);

  const changeHandler = useCallback(
    e => {
      setParams({
        ...params,
        [e.target.name]: e.target.value
      });
    },
    [params]
  );

  const startGame = () => {
    setIsStart(true);
    getRows();
  };

  const clickHandler = id => {
    openCell(id);
  };

  const leftClickHandler = id => {
    setFlag(id);
  };

  return (
    <div className="field">
      <SetGameParams
        disableParams={disableParams}
        params={params}
        onChange={changeHandler}
      />
      <button disabled={disableParams} onClick={startGame} className="button">
        START GAME
      </button>
      {isStart ? (
        <Field
          leftClickHandler={leftClickHandler}
          clickHandler={clickHandler}
          rows={rows}
        />
      ) : (
        <FakeField params={params} />
      )}
      <GameStatus bombs={bombs} time={time} />
    </div>
  );
};
