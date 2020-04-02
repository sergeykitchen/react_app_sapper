import React from "react";
import "./styles.scss";

export const SetGameParams = React.memo(({ onChange, params }) => {
  return (
    <div className="params">
      <label>
        SET WIDTH
        <input
          name="width"
          onChange={onChange}
          type="number"
          value={params.width}
        />
      </label>
      <label>
        SET HEIGHT
        <input
          name="height"
          onChange={onChange}
          type="number"
          value={params.height}
        />
      </label>
      <label>
        SET COUNT OF BOMBS
        <input
          name="bombs"
          onChange={onChange}
          type="number"
          value={params.bombs}
        />
      </label>
    </div>
  );
});
