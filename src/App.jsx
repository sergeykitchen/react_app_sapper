import React, { useState, useEffect, useCallback } from "react";
import { SetGameParams } from "./components/SetGameParams";
import { Field } from "./components/Field";
import { FakeField } from "./components/FakeField";

import { useGame } from "./hooks/gameHook";
import { GameStatus } from "./components/GameStatus";
import { Message } from "./components/Message";

export const App = () => {
  const {
    rows,
    clickCellHandler,
    setFlag,
    time,
    isStart,
    bombs,
    disableParams,
    startGame,
    params,
    setParams,
    message,
    restartGame
  } = useGame();

  const changeHandler = useCallback(
    e => {
      setParams({
        ...params,
        [e.target.name]: e.target.value
      });
    },
    [params]
  );

  const clickHandler = id => {
    clickCellHandler(id);
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
      {disableParams ? (
        <button onClick={restartGame} className="button">
          NEW GAME
        </button>
      ) : (
        <button onClick={startGame} className="button">
          START GAME
        </button>
      )}
      <div className="field_container">
        {isStart ? (
          <Field
            leftClickHandler={leftClickHandler}
            clickHandler={clickHandler}
            rows={rows}
          />
        ) : (
          <FakeField params={params} />
        )}
      </div>
      <GameStatus bombs={bombs} time={time} />
      <Message
        status={message.status}
        shown={message.shown}
        text={message.text}
      />
    </div>
  );
};
