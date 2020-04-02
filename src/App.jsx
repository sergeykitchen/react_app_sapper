import React, { useState, useEffect, useCallback } from "react";
import { SetGameParams } from "./components/SetGameParams";
import { Field } from "./components/Field";
import { useGame } from "./hooks/gameHook";
import { GameStatus } from "./components/GameStatus";

const defaultParams = {
  width: 20,
  height: 20,
  bombs: 10
};

export const App = () => {
  const [params, setParams] = useState(defaultParams);

  const { rows, getRows, openCell, setFlag, time, isStart, bombs } = useGame(
    params
  );

  useEffect(() => {
    getRows();
  }, []);

  useEffect(() => {
    getRows();
  }, [params]);

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
        isStart={isStart}
        params={params}
        onChange={changeHandler}
      />
      <button onClick={startGame} className="button">
        NEW GAME
      </button>
      <Field
        leftClickHandler={leftClickHandler}
        clickHandler={clickHandler}
        rows={rows}
      />
      <GameStatus bombs={bombs} time={time} />
    </div>
  );
};
