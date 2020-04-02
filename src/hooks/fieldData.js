import { useState } from "react";

export const useFieldData = params => {
  const [rowsData, setRows] = useState([]);

  const getRows = () => {
    const { bombs, width, height } = params;
    let count = 0;
    const rows = [];
    let bombNumbers = [];
    const cells = width * height;

    for (let i = 0, n = bombs; i < n; i++) {
      let randInt = Math.floor(Math.random() * cells) + 0;
      if (bombNumbers.indexOf(randInt) != -1) {
        i--;
        continue;
      }
      bombNumbers.push(randInt);
    }

    for (let i = 0, h = height; i < h; i++) {
      let row = [];
      for (let j = 0, w = width; j < w; j++) {
        let cell = {
          id: "" + i + j,
          row: i,
          cell: j,
          value: "",
          isBomb: false,
          isOpen: false,
          flag: false,
          check: false
        };
        if (bombNumbers.indexOf(count) != -1) {
          cell.isBomb = true;
        } else cell.value = "";
        count++;
        row.push(cell);
      }
      rows.push(row);
    }

    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].length; j++) {
        if (rows[i][j].isBomb) {
          for (
            let k = Math.max(0, i - 1);
            k <= Math.min(i + 1, rows.length - 1);
            k++
          ) {
            for (
              let l = Math.max(0, j - 1);
              l <= Math.min(j + 1, rows[i].length - 1);
              l++
            ) {
              if (!rows[k][l].value) {
                rows[k][l].value = 0;
              }
              rows[k][l].value += 1;
            }
          }
        }
      }
    }
    setRows(rows);
  };

  const gameOver = () => {
    for (let i = 0; i < rowsData.length; i++) {
      for (let j = 0; j < rowsData[i].length; j++) {
        rowsData[i][j].isOpen = true;
      }
    }
    setRows([...rowsData]);
  };

  function openCells(arr, i, j) {
    if (arr[i][j].isOpen) return;
    arr[i][j].isOpen = true;
    if (arr[i][j].flag) flags++;

    for (
      var k = Math.max(0, i - 1);
      k <= Math.min(i + 1, arr.length - 1);
      k++
    ) {
      for (
        var l = Math.max(0, j - 1);
        l <= Math.min(j + 1, arr[i].length - 1);
        l++
      ) {
        if (arr[i][j].value) {
          return;
        }

        openCells(arr, k, l);
      }
    }
  }

  const openEmptyCells = (row, cell) => {
    if (cell.isOpen) return;

    const copy = [...rowsData];
    openCells(copy, row, cell);

    setRows(copy);
  };

  const openCell = id => {
    const [row, cell] = id.split("");
    const desiredCell = rowsData[row][cell];
    if (desiredCell.isOpen) {
      return;
    }
    if (desiredCell.isBomb) {
      gameOver();
      return;
    }

    if (!desiredCell.value) {
      openEmptyCells(+row, +cell);
      return;
    }

    desiredCell.isOpen = true;
    setRows([...rowsData]);
  };

  const setFlag = id => {
    const [row, cell] = id.split("");
    if (rowsData[row][cell].isOpen) {
      return;
    }
    rowsData[row][cell].flag = !rowsData[row][cell].flag;
    setRows([...rowsData]);
  };

  return { rows: rowsData, getRows, openCell, setFlag };
};

// noBombCells = width * height - bombNumbers.length;
