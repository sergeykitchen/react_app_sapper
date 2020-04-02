import React, { useState, useEffect } from "react";
import "./styles.scss";

export const GameStatus = ({ time = 0, bombs }) => {
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
};
