import React from "react";
import "./styles.scss";

export const SetGameParams = React.memo(
  ({ onChange, params, disableParams }) => {
    return (
      <div className={`params ${disableParams ? "disabled" : ""}`}>
        <div>
          <label>SET WIDTH</label>
          <input
            name="width"
            onChange={onChange}
            type="number"
            value={params.width}
          />
        </div>
        <div>
          <label>SET HEIGHT</label>
          <input
            name="height"
            onChange={onChange}
            type="number"
            value={params.height}
          />
        </div>
        <div>
          <label>SET COUNT OF BOMBS</label>
          <input
            name="bombs"
            onChange={onChange}
            type="number"
            value={params.bombs}
          />
        </div>
      </div>
    );
  }
);
