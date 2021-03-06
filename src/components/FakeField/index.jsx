import React from "react";

const MIN_SIZE = 5;
const MAX_SIZE = 25;
export const FakeField = React.memo(({ params }) => {
  const getTable = () => {
    const rows = [];
    const W = Math.max(MIN_SIZE, Math.min(MAX_SIZE, params.width));
    const H = Math.max(MIN_SIZE, Math.min(MAX_SIZE, params.height));

    for (let i = 0; i < H; i++) {
      const row = [];
      for (let j = 0; j < W; j++) {
        row.push(
          <td className="cell" key={"" + i + j}>
            <div />
          </td>
        );
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
});
