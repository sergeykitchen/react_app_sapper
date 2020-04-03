import { useState, useEffect, useCallback } from "react";

let timer = null;
const MIN_SIZE = 5;
const MAX_SIZE = 25;
const defaultParams = {
  width: 10,
  height: 10,
  bombs: 10
};

const convertTime = seconds => {
  const date = new Date(null);
  date.setSeconds(seconds); // specify value for SECONDS here
  return date.toISOString().substr(11, 8);
};

export const useGame = () => {
  const [params, setParams] = useState(defaultParams);
  const [rowsData, setRows] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [time, setTime] = useState(0);
  const [bombs, setBombs] = useState(params.bombs);
  const [disableParams, setDisableParams] = useState(false);

  const validateSettings = () => {};

  const startGame = () => {
    getRows();
    setIsStart(true);
  };

  const getRows = useCallback(() => {
    const { bombs, width, height } = params;
    let count = 0;
    const rows = [];
    let bombNumbers = [];
    const W = Math.max(MIN_SIZE, Math.min(MAX_SIZE, width));
    const H = Math.max(MIN_SIZE, Math.min(MAX_SIZE, height));
    const cells = W * H;
    const B = Math.max(1, Math.min(bombs, cells));

    for (let i = 0, n = B; i < n; i++) {
      let randInt = Math.floor(Math.random() * cells) + 0;
      if (bombNumbers.indexOf(randInt) != -1) {
        i--;
        continue;
      }
      bombNumbers.push(randInt);
    }

    for (let i = 0, h = H; i < h; i++) {
      let row = [];
      for (let j = 0, w = W; j < w; j++) {
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
    setTime(0);
    setDisableParams(true);
    setParams({
      width: W,
      height: H,
      bombs: B
    });
    setBombs(B);
    setRows(rows);
  }, [params]);

  const gameOver = () => {
    for (let i = 0; i < rowsData.length; i++) {
      for (let j = 0; j < rowsData[i].length; j++) {
        rowsData[i][j].isOpen = true;
      }
    }
    setRows([...rowsData]);
    //  setIsStart(false);
    setDisableParams(false);
  };

  const openCells = (arr, i, j) => {
    if (arr[i][j].isOpen) return;
    arr[i][j].isOpen = true;
    // if (arr[i][j].flag) flags++;
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
  };

  const openEmptyCells = (row, cell) => {
    if (cell.isOpen) return;
    const copy = [...rowsData];
    openCells(copy, row, cell);

    setRows(copy);
  };

  const openCell = clickedCell => {
    setIsStart(true);
    const { row, cell } = clickedCell;
    if (clickedCell.isOpen) {
      return;
    }
    if (clickedCell.isBomb) {
      gameOver();
      return;
    }

    if (!clickedCell.value) {
      openEmptyCells(+row, +cell);
      return;
    }

    //desiredCell.isOpen = true;
    clickedCell.isOpen = true;
    setRows([...rowsData]);
  };

  const setFlag = clickedCell => {
    const { row, cell } = clickedCell;
    if (rowsData[row][cell].isOpen) {
      return;
    }

    let computedBombs;
    if (rowsData[row][cell].flag) {
      rowsData[row][cell].flag = false;
      computedBombs = bombs + 1;
    } else {
      rowsData[row][cell].flag = true;
      computedBombs = bombs - 1;
    }

    setRows([...rowsData]);
    setBombs(Math.max(0, computedBombs));
  };

  useEffect(() => {
    if (disableParams) {
      timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [time, disableParams]);

  return {
    rows: rowsData,
    getRows,
    openCell,
    setFlag,
    time: convertTime(time),
    isStart,
    bombs,
    disableParams,
    setIsStart,
    startGame,
    params,
    setParams
  };
};

// noBombCells = width * height - bombNumbers.length;