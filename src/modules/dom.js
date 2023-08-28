/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable no-plusplus */

import { moveKnight } from './travails';

function createDom() {
  const gameBoard = document.querySelector('.game-board');
  for (let row = 8; row >= 1; row--) {
    for (let col = 1; col <= 8; col++) {
      const square = document.createElement('div');

      if ((row % 2 === 0 && col % 2 !== 0)
        || (row % 2 !== 0 && col % 2 === 0)) {
        square.style.background = 'black';
      } else {
        square.style.backgroundColor = 'white';
      }

      square.classList.add('cell');
      square.classList.add(`cell-${row}-${col}`);
      gameBoard.appendChild(square);
    }
  }

  const letterMarks = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const letters = document.querySelectorAll('.letters');
  const numbers = document.querySelectorAll('.numbers');

  for (let i = letterMarks.length - 1; i >= 0; i--) {
    const letterSpace = document.createElement('p');
    letterSpace.textContent = letterMarks[i];
    letters[0].appendChild(letterSpace);
  }

  for (let i = 0; i < letterMarks.length; i++) {
    const letterSpace = document.createElement('p');
    letterSpace.textContent = letterMarks[i];
    letters[1].appendChild(letterSpace);
  }

  for (let i = 1; i < 9; i++) {
    const numberSpace = document.createElement('p');
    numberSpace.textContent = i;
    numbers[1].appendChild(numberSpace);
  }

  for (let i = 8; i >= 1; i--) {
    const numberSpace = document.createElement('p');
    numberSpace.textContent = i;
    numbers[0].appendChild(numberSpace);
  }

  let isChoosingStart = false;
  let isChoosingEnd = false;
  const img = document.createElement('img');
  img.src = 'images/knight-figure-2D.png';
  const screen = document.querySelector('.timer-screen h2');
  const knightPlace = document.querySelector('.place-knight');
  const endPlace = document.querySelector('.select-end');
  const buttonMove = document.querySelector('.travail');
  const reset = document.querySelector('.reset');
  let data = [];

  knightPlace.addEventListener('click', () => {
    isChoosingStart = true;
    knightPlace.disabled = true;
    screen.textContent = 'Select one field';
  });

  endPlace.addEventListener('click', () => {
    isChoosingEnd = true;
    endPlace.disabled = true;
    screen.textContent = 'Select one field';
  });

  reset.addEventListener('click', () => {
    isChoosingEnd = false;
    isChoosingStart = false;
    endPlace.disabled = false;
    knightPlace.disabled = false;
    data = [];
    screen.textContent = '';
    const image = document.querySelector('.knight-figure');
    document.querySelector('.game-board').removeChild(image);
  });

  buttonMove.addEventListener('click', () => {
    screen.textContent = '';
    moveKnight(data[0], data[1]);
    data = [];
  });

  document.addEventListener('click', (e) => {
    if (isChoosingStart) {
      const clickedElement = e.target;
      const classes = clickedElement.classList;

      if (classes.contains('cell')) {
        screen.textContent = '';
        isChoosingStart = false;
        knightPlace.disabled = false;
        const numClass = classes[1];
        img.classList.add('knight-figure');
        document.querySelector('.game-board').appendChild(img);
        const numsOnly = numClass.split('-');
        const rowNum = numsOnly[1] - 1;
        const colNum = numsOnly[2] - 1;
        const fullLocation = [colNum, rowNum];
        moveFigure(fullLocation);
        data.shift();
        data.unshift(fullLocation);
      }
    } else if (isChoosingEnd) {
      const clickedElement = e.target;
      const classes = clickedElement.classList;

      if (classes.contains('cell')) {
        screen.textContent = 'Press travail';
        isChoosingEnd = false;
        endPlace.disabled = false;
        const numClass = classes[1];
        const numsOnly = numClass.split('-');
        const rowNum = numsOnly[1] - 1;
        const colNum = numsOnly[2] - 1;
        const fullLocation = [colNum, rowNum];
        if (data.length === 2) {
          data.pop();
        } else if (data.length === 0) {
          alert('Please place your knight first');
          return;
        }
        data.push(fullLocation);
      }
    }
  });
}

export function moveFigure(arr) {
  const middleImg = document.querySelector('.middle img');
  const cellSize = 52;
  middleImg.style.left = `${arr[0] * cellSize}px`;
  middleImg.style.bottom = `${arr[1] * cellSize}px`;
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const toAdd = `${letters[arr[0]]}${arr[1] + 1}`;
  const display = document.querySelector('.timer-screen h2');
  display.textContent += ` ${toAdd}`;
}

export default createDom;
