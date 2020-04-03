import React from "react";

export const FakeField = ({ params }) => {
  const getTable = () => {
    const rows = [];

    for (let i = 0; i < params.height; i++) {
      const row = [];
      for (let j = 0; j < params.width; j++) {
        row.push(<td className="cell" key={"" + i + j}></td>);
      }
      rows.push(<tr key={i}>{[row]}</tr>);
    }
    return rows;
  };

  return (
    <table className="game_field fake">
      <tbody>{getTable()}</tbody>
    </table>
  );
};
