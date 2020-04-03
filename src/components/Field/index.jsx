import React from "react";

const colors = [
  "rgb(203, 251, 11)",
  "rgb(27, 174, 237)",
  "rgb(215, 36, 144)",
  "rgb(230, 138, 25)",
  "rgb(203, 251, 11)",
  "rgb(27, 174, 237)",
  "rgb(215, 36, 144)",
  "rgb(230, 138, 25)"
];

export const Field = ({ rows, clickHandler, leftClickHandler }) => {
  const onClick = id => () => {
    clickHandler(id);
  };
  const onContextMenu = id => e => {
    e.preventDefault();
    leftClickHandler(id);
  };

  const getTable = rows => {
    return rows.map((row, index) => {
      return (
        <tr key={index}>
          {row.map((cell, index) => {
            let content = "";
            let additionClass = "";
            let color = "";
            if (cell.flag) {
              content = "⚑";
            }
            if (cell.isOpen) {
              color = colors[cell.value - 1];
              additionClass = "isOpen";
              content = cell.value;
            }
            if (cell.isBomb && cell.isOpen) {
              additionClass = "isOpen bomb";
              content = "";
            } else {
            }

            return (
              <td
                onClick={onClick(cell)}
                onContextMenu={onContextMenu(cell)}
                className={`cell ${additionClass}`}
                key={index}
                style={{ color: color }}
              >
                <div>{content}</div>
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <table className="game_field">
      <tbody>{getTable(rows)}</tbody>
    </table>
  );
};
