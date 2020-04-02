import React, { useState, useEffect, useCallback } from "react";
import { SetGameParams } from "./components/SetGameParams";
import { Field } from "./components/Field";
import { useFieldData } from "./hooks/fieldData";

const defaultParams = {
  width: 10,
  height: 10,
  bombs: 1
};

export const App = () => {
  const [params, setParams] = useState(defaultParams);

  const { rows, getRows, openCell, setFlag } = useFieldData({
    ...params
  });

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
      <SetGameParams params={params} onChange={changeHandler} />
      <button onClick={startGame} className="button">
        NEW GAME
      </button>
      <Field
        leftClickHandler={leftClickHandler}
        clickHandler={clickHandler}
        rows={rows}
      />
    </div>
  );
};
