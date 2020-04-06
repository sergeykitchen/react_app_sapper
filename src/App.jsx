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
    openCell,
    setFlag,
    time,
    isStart,
    bombs,
    disableParams,
    startGame,
    params,
    setParams,
    message
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
    openCell(id);
  };

  const leftClickHandler = id => {
    setFlag(id);
  };

  const letsPlay = () => {
    startGame();
  };

  return (
    <div className="field">
      <SetGameParams
        disableParams={disableParams}
        params={params}
        onChange={changeHandler}
      />
      <button disabled={disableParams} onClick={letsPlay} className="button">
        START GAME
      </button>
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
