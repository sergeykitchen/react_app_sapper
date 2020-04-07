import React from "react";
import "./styles.scss";

export const GameStatus = React.memo(({ time, bombs }) => {
  return (
    <>
      <table className="status_table">
        <tbody>
          <tr>
            <td>Time: {time} </td>
            <td>Bombs left: {bombs}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
});
